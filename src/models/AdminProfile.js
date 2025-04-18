export default (sequelize, DataTypes) => {
  const AdminProfile = sequelize.define(
    'adminProfile',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      jwtVersion: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      paranoid: true, // Enables soft deletes
      timestamps: true, // Enables createdAt and updatedAt
      tableName: 'adminProfiles',
    }
  );

  // Define associations
  AdminProfile.associate = (models) => {
    AdminProfile.belongsTo(models.Account);

    AdminProfile.belongsTo(models.AccessRole, {
      foreignKey: 'accessRoleId',
      as: 'accessRole',
    });

    AdminProfile.hasMany(models.Jwt, {
      foreignKey: 'adminProfileId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return AdminProfile;
};
