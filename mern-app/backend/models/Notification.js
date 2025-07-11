// models/Notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Account", 
    required: true 
},
  message: { 
    type: String, 
    required: true 
},
  type: { 
    type: String, 
    enum: ["event assignment", "reminder", "update"], 
    default: "event assignment" 
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
