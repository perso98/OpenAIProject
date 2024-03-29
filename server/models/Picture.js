module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define("Picture", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    public: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  });

  Picture.associate = (models) => {
    models.Picture.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    models.Picture.hasMany(models.Like, {
      foreignKey: "PictureId",
    });
  };

  return Picture;
};
