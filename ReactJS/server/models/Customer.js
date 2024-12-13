const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("Customer", {
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        PhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'Customers',
        timestamps: true,
    });

    // Hash password before saving to database
    Customer.beforeCreate(async (customer) => {
        const salt = await bcrypt.genSalt(10);
        customer.Password = await bcrypt.hash(customer.Password, salt);
    });

    return Customer;
};
