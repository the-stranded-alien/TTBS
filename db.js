const Sequelize = require('sequelize')

const db = new Sequelize('ttbs_db', 'ttbs', 'ttbs_password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5
    }
})

// Table 1 : Show Details (name -> shows)
// Column 1 : date -> Show Date (YYYY-MM-DD)
// Column 2 : time -> Show Time (12 for 12:00, 15 for 15:00, 18 for 18:00, 21 for 21:00)
// Column 3 : ticket_count -> Tickets Sold For This Show
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

// Table 2 : Registered Users (name -> users)
// Column 1 : user_id -> Unique User Id
// Column 2 : name -> User's Name
// Column 3 : phone -> User's Phone Number 
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

// Table 3 : Tickets Sold (name -> tickets)
// Column 1 : ticket_id -> Unique Ticket Id
// Column 2 : date -> Show Date On The Ticket
// Column 3 : time -> Show Time On The Ticket
// Column 4 : user_id -> user_id Of The User Who Booked This Ticket
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