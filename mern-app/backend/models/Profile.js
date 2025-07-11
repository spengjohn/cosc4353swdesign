import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
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
    uppercase: true,
    minlength: 2,
    maxlength: 2,
    validate: {
      validator: v => /^[A-Z]{2}$/.test(v),
      message: props => `${props.value} is not a valid 2-letter state code!`
    }
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

export default mongoose.model("Profile", profileSchema);
