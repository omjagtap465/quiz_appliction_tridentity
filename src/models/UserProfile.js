export default (sequelize, DataTypes) => {
  const UserProfile = sequelize.define(
    'userProfile',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'active',
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      contact: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true, // Enables soft deletes
      timestamps: true, // Enables createdAt and updatedAt
      tableName: 'userProfiles',
      indexes: [
        {
          unique: true,
          fields: ['contact'],
        },
      ],
    }
  );

  // Define associations
  UserProfile.associate = (models) => {
    // One-to-One with Account
    UserProfile.belongsTo(models.Account);
    // One-to-One with AccessRole
    UserProfile.belongsTo(models.AccessRole, {
      foreignKey: 'accessRoleId',
      as: 'accessRole',
    });
    UserProfile.hasMany(models.Jwt, {
      foreignKey: 'userProfileId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return UserProfile;
};
