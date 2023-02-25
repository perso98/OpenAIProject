module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  Like.associate = (models) => {
    models.Like.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    models.Like.belongsTo(models.Picture, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Like;
};
