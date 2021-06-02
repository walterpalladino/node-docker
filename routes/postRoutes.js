const express = require("express");

const postControllers = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

//  localhost:3000/
router
    .route("/")
    .get(protect, postControllers.getAllPosts)
    .post(protect, postControllers.createPost);

//  localhost:3000/:id
router
    .route("/:id")
    .get(protect, postControllers.getOnePost)
    .patch(protect, postControllers.updatePost)
    .delete(protect, postControllers.deletePost);

module.exports = router;
