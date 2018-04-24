module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("burger", {
        burger_name: DataTypes.STRING,
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        eaten_by: {
            type: DataTypes.STRING,
            defaultValue: ""
        }
    }, {timestamps: false});
    return Burger;
};