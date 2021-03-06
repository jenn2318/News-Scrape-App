//Schema for the comments
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
    "Comment",
    new Schema({
        comment: {
            type: String,
            required: ['You must submit a comment.']
        }
    })
);