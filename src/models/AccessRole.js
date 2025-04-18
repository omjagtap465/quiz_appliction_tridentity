export default (sequelize, DataTypes) => {
  const AccessRole = sequelize.define(
    "accessRole",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      all: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      paranoid: true, // Enables soft deletes
      timestamps: true, // Enables createdAt and updatedAt
      tableName: "accessRoles",
      indexes: [
        {
          unique: true,
          name: "coyRoleName",
          fields: ["name"],
        },
      ],
    }
  );

  // Define associations
  AccessRole.associate = (models) => {
    AccessRole.hasMany(models.AccessRoleRight, {
      foreignKey: "accessRoleId",
      as: "accessRoleRights",
    });

    AccessRole.hasOne(models.UserProfile, {
      foreignKey: "accessRoleId",
      as: "userProfile",
    });

    AccessRole.hasOne(models.AdminProfile, {
      foreignKey: "accessRoleId",
      as: "adminProfile",
    });
  };

  return AccessRole;
};
