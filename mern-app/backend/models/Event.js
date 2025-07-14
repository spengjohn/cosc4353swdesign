import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  attended: {
    type: Boolean,
    default: false,
  },
}, { _id: false });

const eventSchema = new mongoose.Schema({
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
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  skillsRequired: [{
    type: String,
    required: true,
  }],
  assignedVolunteers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    unique: true,
  }],
  attendance: [attendanceSchema],
}, {
  timestamps: true,
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
