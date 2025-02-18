import mongoose from "mongoose";
const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    prescription: {
        type: String // Will store file path
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'assigned', 'completed'],
        default: 'pending'
    },
    assignedDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }
}, { timestamps: true });

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
    appointments: [appointmentSchema],
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
