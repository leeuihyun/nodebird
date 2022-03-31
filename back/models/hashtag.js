module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define(
        "Hashtag",
        {
            // Mysql에는 users 테이블(모델) 테이블 생성
            //id: {}, id가 기본적으로 mysql에 들어있음 1,..2..3..4.
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
        },
        {
            charset: "utf8mb4",
            collate: "utf8mb4-general-ci", //한글save
        }
    );
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
    };
    return Hashtag;
};
