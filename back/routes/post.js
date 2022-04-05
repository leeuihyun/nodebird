const express = require("express");
const { Post, Comment, Image, User } = require("../models");
const router = express.Router();
const { isLoggedIn } = require("./middlewares");

router.post("/", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [
                {
                    model: Image,
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User, // 댓글 작성자
                            attributes: ["id", "nickname"],
                        },
                    ],
                },
                {
                    model: User,
                    attributes: ["id", "nickname"],
                },
            ],
        });

        res.status(201).json(fullPost);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
    try {
        console.log("1");
        const post = await Post.findOne({
            where: { id: req.params.postId },
        });
        console.log("2");
        if (!post) {
            return res.status(403).send("존재하지 않는 게시글입니다.");
        }
        console.log("3");
        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id,
        });
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: {
                model: User,
                attributes: ["id", "nickname"],
            },
        });
        console.log("4");
        res.status(201).json(fullComment);
        console.log("5");
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.delete("/", (req, res) => {
    res.json({ id: 1 });
});

module.exports = router;
