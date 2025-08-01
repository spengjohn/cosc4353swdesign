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
    maxlength: 2,
  },
  skills: [{
    type: String,
    required: true
  }],
  preferences: String,
  availableDates: {
    type: [Date], 
    required:true,
  },
  
}, {
  timestamps: true,
});

export default mongoose.model("UserProfile", userProfileSchema);
