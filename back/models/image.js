module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define(
        "Image",
        {
            // Mysql에는 users 테이블(모델) 테이블 생성
            //id: {}, id가 기본적으로 mysql에 들어있음 1,..2..3..4.
            src: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
        },
        {
            charset: "utf8",
            collate: "utf8-general-ci", //한글save
        }
    );
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    };
    return Image;
};
