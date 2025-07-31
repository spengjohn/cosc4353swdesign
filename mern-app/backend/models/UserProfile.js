import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  credentialId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserCredentials",
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  address1: {
    type: String,
    required: true,
    maxlength: 100,
  },
  address2: {
    type: String,
    maxlength: 100,
  },
  zipcode: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 9,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
    enum: [
      "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
      "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
      "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
      "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
      "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ]
  },
  skills: [{
    type: String,
    required: true
  }],
  preferences: String,
  availableDates: [Date],
  
}, {
  timestamps: true,
});

export default mongoose.model("UserProfile", userProfileSchema);
