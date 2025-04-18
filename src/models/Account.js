export default (sequelize, DataTypes) => {
  const Account = sequelize.define(
    'account',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      mobile: {
        type: DataTypes.STRING,
      },
      resetToken: {
        type: DataTypes.STRING,
      },
      mobileVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      tableName: 'accounts',
    }
  );

  // Define associations
  Account.associate = (models) => {
    Account.hasOne(models.UserProfile, {
      foreignKey: 'accountId',
      as: 'userProfile',
    });
  };

  return Account;
};
