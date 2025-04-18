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
      profileType: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true, // Enables createdAt and updatedAt
      tableName: 'jwts',
    }
  );

  // Define associations
  Jwt.associate = (models) => {
    // JWT belongs to UserProfile
    Jwt.belongsTo(models.UserProfile, {
      foreignKey: 'customerId',
      as: 'customer',
    });
  };

  return Jwt;
};
