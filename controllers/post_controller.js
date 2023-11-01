const Post = require('../models/post_model');
const { deleteOne, updateOne } = require('../models/user_model');

module.exports = class PostController {

  //Retrieve post:
  static async getPosts() {
    return await Post.find({}, "")
      .populate('user', '_id fullName profile_img')
      .lean()
  }

  //Retrieve allLoggedInUser post:
  static async getloggedInUserPosts() {
    return await Post.find({}, "description _id location image").lean()
  }

  // Create Post:
  static async createPost(document, user) {
    if (!user) {
      throw new Error("user not Found")
    }
    document.user = user;
    const post = await Post.create(document)
    return post
  };

  // Delete post by ID:
  static async deletePost(id) {
    // Find the post to delete and populate the "user" field
    const post = await Post.findOne({ _id: id }).populate("user", "_id")

    if (!post) {
      throw new Error('post not found')
    }

    // Now you can delete the found post using .remove() or .deleteOne()
    await post.deleteOne(); // Or use .remove() if needed

    return post   // Return the deleted post

  };

  // controller for likes post
  static async likePost(id, userId) {
    // Find the post by its ID and push the user's ID to the 'likes' array
    const post = await Post.findByIdAndUpdate(id,
      { $push: { likes: userId } },
      { new: true })
      .populate("likes", "_id fullName")
      .lean()
    return post
  };

  // controller for unLikes post
  static async unLikePost(id, userId) {
    // Find the post by its ID and push the user's ID to the 'likes' array
    const post = await Post.findByIdAndUpdate(id,
      { $pull: { likes: userId } },
      { new: true })
      .populate("likes", "_id fullName")
      .lean()
    return post
  };

  // controller for comments on post
  static async commentOnPost(id, body) {
    // Find the post by its ID and push the user's ID to the 'comment' array
    const post = await Post.findByIdAndUpdate(id,
      { $push: { comments: {
        commentText: body.commentText,
        commentedBy: body.userId
      } } },
      { new: true })
      .populate("comments.commentedBy", "_id fullName")  // comment owner
      .populate("user", "_id fullName")   // post owner
      .lean()
    return post
  };

}