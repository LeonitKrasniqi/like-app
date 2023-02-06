const express = require("express");
const router = new express.Router();
const Like = require("../models/like");
const auth = require("../middleware/auth");

router.post("/likes", auth, async (req, res) => {
  const existingLike = await Like.findOne({
    user: req.body.user,
    likedUser: req.body.likedUser,
  });
  if (existingLike) {
    return res.status(400).send({ error: "Like already exists" });
  }
  const like = new Like({
    user: req.body.user,
    likedUser: req.body.likedUser,
  });
  like
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.delete("/likes/:id", (req, res) => {
  Like.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = router;
