export default (sequelize, DataTypes) => {
  const ModelLog = sequelize.define(
    'modelLog',
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
      docType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      docId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      parentDocId: {
        type: DataTypes.INTEGER,
      },
      pastData: {
        type: DataTypes.TEXT,
      },
      newData: {
        type: DataTypes.TEXT,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      indexes: [{ fields: ['docId'] }, { fields: ['profileId'] }],
    }
  );

  // Associations will be defined here
  ModelLog.associate = (models) => {
    // Example: ModelLog.belongsTo(models.UserProfile, { foreignKey: "profileId" });
  };

  return ModelLog;
};
