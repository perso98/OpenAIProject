module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Comment.associate = (models) => {
    models.Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    models.Comment.belongsTo(models.Picture, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Comment;
};
