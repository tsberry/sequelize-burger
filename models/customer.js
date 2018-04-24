module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("customer", {
        customer_name: DataTypes.STRING,
        burgers_eaten: {
            type: DataTypes.STRING,
            defaultValue: ""
        }
    }, {timestamps: false});
    return Customer;
};