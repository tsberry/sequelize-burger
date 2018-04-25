module.exports = function (sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        burger_name: DataTypes.STRING,
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, { timestamps: false });

    Burger.associate = function (models) {
        models.Burger.belongsTo(models.Customer, {
            onDelete: "CASCADE",
            foreignKey: {
                name: "customer_name",
                allowNull: true
            },
            targetKey: "customer_name"
        });
    };

    return Burger;
};