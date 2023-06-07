const db = require('./index')

const getAllUsers = () => {
    return db.query('SELECT id, username, email from users;')
        .then(result => result.rows)
}

const createUser = (username, email, passwordHash) => {
    const sql = `INSERT INTO users (username, email, password_hash) VALUES($1 ,$2 ,$3) RETURNING *;`
    return db.query(sql, [username, email, passwordHash])
        .then(result => result.rows[0])
}


const getUserByEmail = (email) => {
    const sql = 'SELECT * FROM users WHERE email = $1 limit 1;'
    return db.query(sql, [email])
        .then(result => result.rows[0])
        
} 

module.exports = {
    getAllUsers,
    createUser,
    getUserByEmail
}

