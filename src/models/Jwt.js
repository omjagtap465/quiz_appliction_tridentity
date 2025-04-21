export default (sequelize, DataTypes) => {
  const Jwt = sequelize.define(
    'Jwt',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        defaultValue: 'ACTIVE',
        type: DataTypes.TEXT,
      },
      token: {
        type: DataTypes.TEXT,
      },
      expire: {
        type: DataTypes.STRING,
      },
      customerId:{
        type:DataTypes.INTEGER,
      }
    },
    {
      timestamps: true, // Enables createdAt and updatedAt
      tableName: 'jwts',
    }
  );

  // Define associations
  Jwt.associate = (models) => {
    // JWT belongs to customer
    Jwt.belongsTo(models.Customers, {
      foreignKey: 'customerId',
      as: 'customers',
    });
  };

  return Jwt;
};
