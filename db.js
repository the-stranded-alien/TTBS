const Sequelize = require('sequelize')

const db = new Sequelize('ttbs_db', 'ttbs', 'ttbs_password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5
    }
})

const Show_Details = db.define('shows', {
    date: {
        type: Sequelize.DATEONLY,
        primaryKey: true
    },
    time: {
        type: Sequelize.TINYINT.UNSIGNED,
        primaryKey: true
    },
    ticket_count: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false
    }
})

const Registered_Users = db.define('users', {
    user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false
    }
})

const Tickets_Sold = db.define('tickets', {
    ticket_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    time: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    }
})

db.sync()
    .then(() => console.log("Database Has Been Synced"))
    .catch((err) => console.error("Error Creating Database"))

exports = module.exports = {
    Show_Details, Registered_Users, Tickets_Sold
}