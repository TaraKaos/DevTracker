var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema(
{
    createdDate: String,
    editedDate: String,
    title: String,
    owner:
    {
        id:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Project", projectSchema);