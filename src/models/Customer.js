export default (sequelize, DataTypes) => {
  const Customers = sequelize.define(
    'customers',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customerName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      membershipId: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      
    },
    {
      paranoid: true, // Enables soft deletes
      timestamps: true, // Enables createdAt and updatedAt
      tableName: 'customers',
      indexes: [],
    }
  );
  Customers.associate = (models) => {
    Customers.hasOne(models.LeaderBoard, {
      foreignKey: "customerId",
      as: "leaderboard",
    });
  Customers.associate = (models) => {
    Customers.hasMany(models.QuizSelectedByUser, {
      foreignKey: "customerId",
      as: "quizSelectedByUser",
    });
  }
};


  return Customers;
};
