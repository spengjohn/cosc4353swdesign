import mongoose from "mongoose";

const volunteerhistorySchema = new mongoose.Schema({
    credentialId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserCredentials",
        required: true,
        unique: true,
    },
    eventHistory: [
    {
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EventDetails",
        unique: true,
        required: true,
      },
      attended: {
        type: Boolean,
        required: true,
      }
    }],
},
{ timestamps : true}
);

export default mongoose.model("VolunteerHistory", volunteerhistorySchema);