import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "UserCredentials", 
    required: true 
},
  message: { 
    type: String,
    default: "",
},
  type: { 
    type: String, 
    enum: ["Event Assignment", "Reminder", "Update"], 
    default: "Event Assignment" 
},
  isRead: { 
    type: Boolean, 
    default: false 
},
  createdAt: { 
    type: Date, 
    default: Date.now 
}
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
