module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        "Comment",
        {
            // Mysql에는 users 테이블(모델) 테이블 생성
            //id:  {}, id가 기본적으로 mysql에 들어있음 1,..2..3..4.
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            charset: "utf8mb4",
            collate: "utf8mb4-general-ci", //한글save
        }
    );
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
    return Comment;
};
