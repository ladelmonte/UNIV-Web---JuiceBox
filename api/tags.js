const express = require("express");
const { getAllTags, getPostsByTagName } = require("../db");
const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /posts");

  next(); // THIS IS DIFFERENT
});

// UPDATE
tagsRouter.get("/", async (req, res, next) => {
  const tags = await getAllTags();

  res.send({
    tags,
  });
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.params;
  try {
    // use our method to get posts by tag name from the db

    const getTags = await getPostsByTagName(tagName);
    // send out an object to the client { posts: // the posts }
    res.send({ getTags });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;
