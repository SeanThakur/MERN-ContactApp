const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserPost = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
    },
    phoneType: {
        type: String,
        default: "personal"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model("posts", UserPost);
