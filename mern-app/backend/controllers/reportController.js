import { createObjectCsvWriter } from 'csv-writer';
import VolunteerHistory from '../models/VolunteerHistory.js';
import UserProfile from '../models/UserProfile.js';
import UserCredentials from '../models/UserCredentials.js';
import Event from '../models/Event.js';
import path from 'path';
import fs from 'fs';

export const generateVolunteerJSONReport = async (req, res) => {
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

      const events = history.eventHistory.map(entry => ({
        eventTitle: entry.event?.title || "Unknown Event",
        status: entry.attended ? "Attended" : "No-Show"
      }));

      records.push({
        fullName,
        email,
        events
      });
    });

    // Set headers to trigger a download
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=volunteer_report.json');
    res.status(200).send(JSON.stringify(records, null, 2));

  } catch (err) {
    console.error("JSON Report Error:", err);
    res.status(500).json({ error: "Failed to generate volunteer JSON report" });
  }
};

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

export const generateEventJSONReport = async (req, res) => {
  try {
    const events = await Event.find()
      .populate({
        path: 'assignedVolunteers',
        model: 'UserCredentials',
        select: 'email'
      })
      .lean();

    const userProfiles = await UserProfile.find().lean();
    const profileMap = {};
    for (const profile of userProfiles) {
      profileMap[profile.credentialId.toString()] = profile.fullName;
    }

    const records = events.map(event => {
      const volunteers = event.assignedVolunteers.map(vol => ({
        fullName: profileMap[vol._id.toString()] || "Unknown",
        email: vol.email
      }));

      return {
        title: event.title,
        description: event.description,
        location: event.location,
        city: event.city,
        state: event.state,
        date: event.date,
        urgency: event.urgency,
        skillsRequired: event.skillsRequired,
        maxVolunteers: event.maxVolunteers,
        assignedVolunteers: volunteers
      };
    });

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=event_report.json');
    res.status(200).send(JSON.stringify(records, null, 2));
  } catch (err) {
    console.error("Event JSON Report Error:", err);
    res.status(500).json({ error: "Failed to generate event JSON report" });
  }
};


export const generateEventCSVReport = async (req, res) => {
  try {
    const events = await Event.find()
      .populate({
        path: 'assignedVolunteers',
        model: 'UserCredentials',
        select: 'email',
      })
      .lean();

    const userProfiles = await UserProfile.find().lean();
    const profileMap = {};
    for (const profile of userProfiles) {
      profileMap[profile.credentialId.toString()] = profile.fullName;
    }

    const records = [];

    events.forEach(event => {
      const baseEvent = {
        title: event.title,
        description: event.description,
        location: event.location,
        city: event.city,
        state: event.state,
        date: new Date(event.date).toISOString().split('T')[0],
        urgency: event.urgency,
        skillsRequired: event.skillsRequired.join(', '),
        maxVolunteers: event.maxVolunteers,
      };

      if (event.assignedVolunteers.length === 0) {
        records.push({
          ...baseEvent,
          volunteerName: "None",
          volunteerEmail: "None"
        });
      } else {
        event.assignedVolunteers.forEach(vol => {
          const name = profileMap[vol._id.toString()] || "Unknown";
          records.push({
            ...baseEvent,
            volunteerName: name,
            volunteerEmail: vol.email,
          });
        });
      }
    });

    const filePath = path.join('reports', `event_report_${Date.now()}.csv`);
    const absolutePath = path.resolve(filePath);
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });

    const csvWriter = createObjectCsvWriter({
      path: absolutePath,
      header: [
        { id: 'title', title: 'Event Title' },
        { id: 'description', title: 'Description' },
        { id: 'location', title: 'Location' },
        { id: 'city', title: 'City' },
        { id: 'state', title: 'State' },
        { id: 'date', title: 'Date' },
        { id: 'urgency', title: 'Urgency' },
        { id: 'skillsRequired', title: 'Skills Required' },
        { id: 'maxVolunteers', title: 'Max Volunteers' },
        { id: 'volunteerName', title: 'Volunteer Name' },
        { id: 'volunteerEmail', title: 'Volunteer Email' },
      ]
    });

    await csvWriter.writeRecords(records);

    res.download(absolutePath, err => {
      if (err) {
        console.error("CSV download error:", err);
        res.status(500).json({ error: "Failed to download event report" });
      } else {
        fs.unlink(absolutePath, () => {});
      }
    });

  } catch (err) {
    console.error("Event CSV Report Error:", err);
    res.status(500).json({ error: "Failed to generate event CSV report" });
  }
};