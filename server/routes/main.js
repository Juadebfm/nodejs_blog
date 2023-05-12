const express = require("express");
const router = express.Router();

//routes
router.get("", (req, res) => {
  const locals = {
    title: "Juadeb Blog",
    description: "Blog Page Created with NodeJS, Express & MongoDB",
  };
  res.render("index", { locals });
});
router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
