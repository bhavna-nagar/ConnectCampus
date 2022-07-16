import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    likes:{
        type:Array,
        required:false
    },
    categorie: {
        type:String,
        required: false   
    },
    createdDate: {
        type: Date
    }
});


const post = mongoose.model('post', PostSchema);

export default post;