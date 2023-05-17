const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

const adminLayout = "../views/layouts/admin";
router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin Page",
      description: "Admin Page for Juadeb Blog",
    };
    res.render("admin/index", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (req.body.username === "admin" && req.body.password === "password") {
      res.send("Youre logged in");
    } else {
      res.send("Wrong Username and Password");
    }

    res.redirect("/admin");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
