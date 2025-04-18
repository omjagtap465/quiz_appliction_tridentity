export default (sequelize, DataTypes) => {
  const ApiAccessLog = sequelize.define(
    'apiAccessLog',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ip: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      profileId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      profileType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      path: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      indexes: [{ fields: ['profileId'] }],
    }
  );

  // Associations will be defined here
  ApiAccessLog.associate = (models) => {
    // Example: ApiAccessLog.belongsTo(models.UserProfile, { foreignKey: "profileId" });
  };

  return ApiAccessLog;
};
