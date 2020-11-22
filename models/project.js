var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema(
{
    createdDate: String,
    title: String,
    author:
    {
        id:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Recipe", projectSchema);