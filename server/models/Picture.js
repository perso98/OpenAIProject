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
  });

  Picture.associate = (models) => {
    models.Picture.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Picture;
};
