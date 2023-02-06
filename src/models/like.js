const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

LikeSchema.methods.like = async function (likedUserId) {
  const like = new Like({
    user: this._id,
    likedUser: likedUserId,
    isLike: true,
  });
  await like.save();
};

LikeSchema.methods.unlike = async function (likedUserId) {
  await Like.findOneAndDelete({ userId: this._id, likedUser: likedUserId });
};

const Like = mongoose.model("Like", LikeSchema);
module.exports = Like;
