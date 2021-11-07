const { Client } = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DATABASE_PORT,
})

client.connect()

exports.query = async (query, values) => {
    const { rows } = await client.query(query, values);
    return rows;
}
