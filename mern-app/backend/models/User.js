// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^\S+@\S+\.\S+$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, 
    },  // hashed password length
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    address1: { 
        type: String, 
        required: true, 
        maxlength: 100 
    },
    address2: { 
        type: String, 
        maxlength: 100 
    },
    zipcode: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 9
    },
    city: { 
        type: String, 
        required: true 
    },
    state: { 
        type: String, 
        required: true,
        uppercase: true,
        maxlength: 2,
        minlength: 2,
        validate: {
            validator: function(v) {
                return /^[A-Z]{2}$/.test(v);  // Must be exactly 2 uppercase letters
            },
            message: props => `${props.value} is not a valid 2-letter state code!`
        }
    },
    skills: [{ 
        type: String, 
        required: true 
    }],
    preferences: { 
        type: String 
    },
    availableDates: [{ 
        type: Date 
    }],
    role: {
        type: String,
        enum: ["admin", "volunteer"],
        required: true,
    },
    isProfileComplete: {
        type: Boolean,
        default: false,
    }
},  {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;
