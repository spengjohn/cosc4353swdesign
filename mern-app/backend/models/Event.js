import mongoose from "mongoose";

const eventDetailsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
    maxlength: 2,
  },
  date: {
    type: Date,
    required: true,
  },
  urgency: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  skillsRequired: [{
    type: String,
    required: true,
  }],
  maxVolunteers: {
    type: Number,
    required: true,
  },
  assignedVolunteers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserCredentials",
  }],
}, {
  timestamps: true,
});

const Event = mongoose.model("EventDetails", eventDetailsSchema);
export default Event;
