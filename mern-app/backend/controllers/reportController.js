import { createObjectCsvWriter } from 'csv-writer';
import VolunteerHistory from '../models/VolunteerHistory.js';
import UserProfile from '../models/UserProfile.js';
import UserCredentials from '../models/UserCredentials.js';
import Event from '../models/Event.js';
import path from 'path';
import fs from 'fs';

export const generateVolunteerCSVReport = async (req, res) => {
  try {
    const histories = await VolunteerHistory.find()
      .populate({
        path: 'credentialId',
        model: 'UserCredentials',
        select: 'email'
      })
      .populate({
        path: 'eventHistory.event',
        model: 'EventDetails',
        select: 'title'
      });

    // Preload user profiles
    const profiles = await UserProfile.find().lean();
    const profileMap = {};
    for (const profile of profiles) {
      profileMap[profile.credentialId.toString()] = profile.fullName;
    }

    const records = [];

    histories.forEach(history => {
      const email = history.credentialId.email;
      const fullName = profileMap[history.credentialId._id.toString()] || "Unknown";

      history.eventHistory.forEach(entry => {
        const title = entry.event?.title || "Unknown Event";
        const status = entry.attended ? "Attended" : "No-Show";

        records.push({
          fullName,
          email,
          eventTitle: title,
          status
        });
      });
    });

    // Set output path
    const filePath = path.join('reports', `volunteer_report_${Date.now()}.csv`);
    const absolutePath = path.resolve(filePath);

    // Ensure folder exists
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });

    const csvWriter = createObjectCsvWriter({
      path: absolutePath,
      header: [
        { id: 'fullName', title: 'Volunteer Name' },
        { id: 'email', title: 'Volunteer Email' },
        { id: 'eventTitle', title: 'Event Title' },
        { id: 'status', title: 'Attendance' }
      ]
    });

    await csvWriter.writeRecords(records);

    res.download(absolutePath, err => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).json({ error: 'Failed to download CSV' });
      } else {
        // Optional: delete file after download
        fs.unlink(absolutePath, () => {});
      }
    });

  } catch (err) {
    console.error("CSV Report Error:", err);
    res.status(500).json({ error: "Failed to generate volunteer report" });
  }
};
