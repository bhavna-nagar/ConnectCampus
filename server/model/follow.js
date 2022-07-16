import mongoose from 'mongoose';

const FollowSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    following: {
        type: Array,
        required: false
    },
  
});


const follow = mongoose.model('follow', FollowSchema);

export default follow;