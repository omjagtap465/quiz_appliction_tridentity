export default (sequelize, DataTypes) => {
    const LeaderBoard = sequelize.define(
      'leaderboard',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        customerId: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        score: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        
        
      },
      {
        paranoid: true, // Enables soft deletes
        timestamps: true, // Enables createdAt and updatedAt
        tableName: 'leaderboard',
        indexes: [],
      }
    );
    LeaderBoard.associate = (models) => {
        LeaderBoard.belongsTo(models.Customers, {
        foreignKey: "customerId",
        as: "customers",
      });
    };
  
  
    return LeaderBoard;
  };
  