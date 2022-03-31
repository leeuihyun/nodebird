module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            // Mysql에는 users 테이블(모델) 테이블 생성
            //id: {}, id가 기본적으로 mysql에 들어있음 1,..2..3..4.
            email: {
                type: DataTypes.STRING(30),
                allowNull: false, //필수
                unique: true, //고유한 값
            },
            nickname: {
                type: DataTypes.STRING(30),
                allowNull: false, //필수
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false, //필수
            },
        },
        {
            charset: "utf8",
            collate: "utf8-general-ci", //한글save
        }
    );
    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
        db.User.belongsToMany(db.User, {
            through: "Follow",
            as: "Followers",
            foreignKey: "FollowingId",
        });
        db.User.belongsToMany(db.User, {
            through: "Follow",
            as: "Followings",
            foreignKey: "FollowerId",
        });
    };
    return User;
};
