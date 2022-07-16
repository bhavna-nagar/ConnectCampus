import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    accounttype: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    likedposts:{
        type:Array,
        required:false
    }
});


const user = mongoose.model('user', userSchema);

export default user;
