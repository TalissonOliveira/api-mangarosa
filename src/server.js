const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')

const app = express()
const port = process.env.PORT || 3333

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(routes)

app.listen(port, () => console.log(`Server is running on port ${port}`))