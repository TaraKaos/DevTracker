var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
const Project = require("../models/project");

//Showall
router.get("/projects", middleware.isLoggedIn, function(req, res)
{
    //Get all projects the user has created
    Project.find({ author: { id: req.user._id, username: req.user.username } }, function(err, userProjects)
    {
        if (err)
        {
            console.log(err);
            req.flash("error", err.message);
        }
        else
        {
            res.render("projects/index", {projects: userProjects});
        }
    });
});

module.exports = router;