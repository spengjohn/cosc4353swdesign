// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
    unique: true,
  },
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
    uppercase: true,
    minlength: 2,
    maxlength: 2,
    validate: {
      validator: v => /^[A-Z]{2}$/.test(v),
      message: props => `${props.value} is not a valid 2-letter state code!`
    }
  },
  date: {
    type: Date,
    required: true,
  },
  urgency: {
    type: String,
    required: true,
  },
  skillsRequired: [{
    type: String,
    required: true,
  }],
  assignedVolunteers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Account",
    unique: true,
  }],
}, {
  timestamps: true,
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
