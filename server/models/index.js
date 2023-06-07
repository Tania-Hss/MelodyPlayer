const { Pool } = require('pg')


const db = new Pool({
    database: 'melody'
})


module.exports = db