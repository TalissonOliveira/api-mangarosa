const express = require('express')
const EmployeeController = require('../controllers/EmployeeController')

const routes = express.Router()

routes.get('/employee', new EmployeeController().findAllEmployee)
routes.post('/employee', new EmployeeController().createEmployee)

module.exports = routes