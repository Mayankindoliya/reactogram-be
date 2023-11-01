const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post_controller');
const { errorHandlersMiddleware } = require('../helpers/middlewares');

//retrieve allUsers post  route:
router.get('/allposts', (req, res, next) => [
  PostController.getPosts(req.user)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      next(err)
    })
]);

//retrieve allUsers post from logged in user :
router.get('/myallposts', (req, res, next) => [
  PostController.getloggedInUserPosts(req.user)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      next(err)
    })
]);

router.post('/createpost', (req, res, next) => {
  // Route handler for POST requests to '/createpost
  PostController.createPost(req.body, req.user)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      next(err)
    })
});

router.delete('/deletepost/:id', (req, res, next) => {
  PostController.deletePost(req.params.id)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      next(err)
    })
});

// router for likes post
router.put("/like/:id", (req, res, next) => {
  PostController.likePost(req.params.id, req.body.userId)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
});

// router for unLikes post
router.put("/unlike/:id", (req, res, next) => {
  PostController.unLikePost(req.params.id, req.body.userId)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
});

// router for comments on post
router.put("/comment/:id", (req, res, next) => {
  PostController.commentOnPost(req.params.id, req.body)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
});


module.exports = router;