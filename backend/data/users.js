const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Admin User',
        email: '1@1.com',
        password: bcrypt.hashSync('111111', 10),
        isAdmin: true
    },
    {
        name: 'Joey Jojo',
        email: 'j@j.com',
        password: bcrypt.hashSync('111111', 10),

    },
    {
        name: 'Steven',
        email: 's@s.com',
        password: bcrypt.hashSync('111111', 10),

    }
]

module.exports = users