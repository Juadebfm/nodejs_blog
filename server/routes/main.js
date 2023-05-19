const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//routes
router.get("", async (req, res) => {
  try {
    const locals = {
      title: "Juadeb Blog",
      description: "Blog Page Created with NodeJS, Express & MongoDB",
    };

    // PAGINATION
    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: "/",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.render("about", { currentRoute: "/about" });
});

router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "Blog Posts",
    };

    res.render("post", { locals, data, currentRoute: `/post/${slug}` });
  } catch (error) {
    console.log(error);
  }
});

router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "search",
      description: "Search",
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialCharacter = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialCharacter, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialCharacter, "i") } },
      ],
    });

    res.render("search", {
      data,
      locals,
      currentRoute: "/search",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
