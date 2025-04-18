
export default (sequelize, DataTypes) => {
    const Models = sequelize.define(
      "models",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        modelName: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        brandId: {
            allowNull: false,
            type: DataTypes.INTEGER,
          },
      },
      {
        paranoid: true,
        timestamps: true,
        tableName: 'models',
        indexes: [],
      }
    );
  
    // Define associations
    Models.associate = (models) => {
        Models.belongsTo(models.Brands, {
        foreignKey: "brandId",
        as: "brands",
      });
    };
  
    return Models;
  };
  