import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // User role definition
    isDoctor: { 
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

    seenNotifications: {
        type: Array,
        default: []
    },
    unseenNotifications: {
        type: Array,
        default: []
    },
},
{
    timestamps: true
}
)
const User = mongoose.model('User', userSchema);

export default User;