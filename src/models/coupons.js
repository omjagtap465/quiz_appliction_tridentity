export default (sequelize, DataTypes) => {
    const Coupons = sequelize.define(
        'coupons',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            code: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            isRedeemed: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            redeemedAt: {
                allowNull: true,
                type: DataTypes.DATE,
            },
            customerId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            }

        },
        {
            paranoid: true, // Enables soft deletes
            timestamps: true, // Enables createdAt and updatedAt
            tableName: 'coupons',
            indexes: [],
        }
    );

    // Define associations
    Coupons.associate = (models) => {
        Coupons.belongsTo(models.Customers, {
            foreignKey: "customerId",
            as: "customers",
        });
    };
    return Coupons;
};
