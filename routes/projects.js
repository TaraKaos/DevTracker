var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
const Project = require("../models/project");

//Showall
router.get("/projects", middleware.isLoggedIn, function(req, res)
{
    //Get all projects the user has created
    Project.find({ owner: { id: req.user._id, username: req.user.username } }, function(err, userProjects)
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

//New
router.get("/projects/new", middleware.isLoggedIn, function(req, res)
{
    res.render("projects/new");
});

//Create
router.post("/projects", middleware.isLoggedIn, function(req, res)
{
    //get data from form and add it to projects array
    var newProject =
    {
        createdDate: middleware.getCurrentDate(),
        editedDate: middleware.getCurrentDate(),
        title: req.body.title,
        owner:
        {
            id: req.user._id,
            username: req.user.username
        }
    }

    //Create a new project and save to DB
    Project.create(newProject, function(err, newlyCreatedProject)
    {
        if (err)
        {
            console.log(err);
            req.flash("error", err.message);
            res.redirect("/projects");
        }
        else
        {
            //redirect back to the projects list
            console.log(newlyCreatedProject);
            req.flash("success", "Created " + newlyCreatedProject.title + " project");
            res.redirect("/projects");
        }
    });
});

module.exports = router;