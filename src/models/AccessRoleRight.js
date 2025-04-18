// export default (sequelize, type) => {
//   return sequelize.define(
//     "accessRoleRight",
//     {
//       id: {
//         type: type.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       accessClassName: {
//         allowNull: false,
//         type: type.STRING,
//       },
//       key: {
//         allowNull: false,
//         type: type.STRING,
//       },
//     },
//     {
//       paranoid: true,
//       indexes: [
//         {
//           unique: true,
//           name: `roleRights`,
//           fields: ["accessRoleId", "accessClassName", "key"],
//         },
//       ],
//     },

//   );
// };

export default (sequelize, DataTypes) => {
  const AccessRoleRight = sequelize.define(
    "accessRoleRight",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      accessRoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      accessClassName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      key: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      tableName: "accessRoleRights",
      indexes: [
        {
          unique: true,
          name: "roleRights",
          fields: ["accessRoleId", "accessClassName", "key"],
        },
      ],
    }
  );

  // Define associations
  AccessRoleRight.associate = (models) => {
    AccessRoleRight.belongsTo(models.AccessRole, {
      foreignKey: "accessRoleId",
      as: "accessRole",
    });
  };

  return AccessRoleRight;
};
