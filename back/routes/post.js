const express = require("express");
const { Post, Comment, Image, User } = require("../models");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

router.post("/", isLoggedIn, async (req, res, next) => {
    try {
        console.log("1");
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        console.log("2");
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [
                {
                    model: Image,
                },
                {
                    model: Comment,
                },
                {
                    model: User,
                },
            ],
        });
        console.log("4");
        res.status(201).json(fullPost);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(403).send("존재하지 않는 게시글입니다.");
        }
        const comment = await Comment.create({
            content: req.body.content,
            postId: req.params,
            UserId: req.user.id,
        });
        res.status(201).json(comment);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.delete("/", (req, res) => {
    res.json({ id: 1 });
});

module.exports = router;
