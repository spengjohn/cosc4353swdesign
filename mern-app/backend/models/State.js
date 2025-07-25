import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
    state: [
    {    
        abbreviation: {
            type: String,
            required: true,
            uppercase: true,
            minlength: 2,
            maxlength: 2,
        },
        name : {
            type: String,
            required: true,
        }
}],
},
{ timestamps : true }
);

export default mongoose.model("State", stateSchema);