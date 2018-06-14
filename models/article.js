const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the Article model with the ArticleSchema
module.exports = mongoose.model(
    "Article",
    new Schema({
        headline: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        comment: [{
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }],
        saved: {
            type: Boolean,
            required: true,
            default: false
        }

    }, {timestamps: true})
);