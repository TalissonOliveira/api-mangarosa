const express = require('express')
const EmployeeController = require('../controllers/EmployeeController')

const routes = express.Router()

routes.post('/employee', new EmployeeController().createEmployee)

module.exports = routes