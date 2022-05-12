const express = require("express");
const { Op } = require("sequelize");
const { Post, Image, User, Comment } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
    // GET /posts
    try {
        const where = {};
        if (parseInt(req.query.lastId, 10)) {
            // 초기 로딩이 아닐 때
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
        } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
        const posts = await Post.findAll({
            where,
            limit: 10, //10개만 가져와라
            order: [
                ["createdAt", "DESC"], //내림차순// 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
                [Comment, "createdAt", "DESC"],
            ],
            include: [
                {
                    model: User,
                    attributes: ["id", "nickname"],
                },
                {
                    model: Image,
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ["id", "nickname"],
                        },
                    ],
                },
                {
                    model: User,
                    as: "Likers",
                    attributes: ["id"],
                },
                {
                    model: Post,
                    as: "Retweet",
                    include: [
                        {
                            model: User,
                            attributes: ["id", "nickname"],
                        },
                        {
                            model: Image,
                        },
                    ],
                },
            ],
        });
        console.log("ing");
        console.log(posts);
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
