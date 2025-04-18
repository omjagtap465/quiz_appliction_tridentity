export default (sequelize, DataTypes) => {
  const Brands = sequelize.define(
    'brands',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      brandName: {
        allowNull: false,
        type: DataTypes.STRING,
      },

    },
    {
      paranoid: true, // Enables soft deletes
      timestamps: true, // Enables createdAt and updatedAt
      tableName: 'brands',
      indexes: [],
    }
  );

  // Define associations
  Brands.associate = (models) => {
    Brands.hasMany(models.Models, {
      foreignKey: "brandId",
      as: "models",
    });

  }
  return Brands;
};
