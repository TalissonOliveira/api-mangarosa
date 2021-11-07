const db = require('../config/database')

class EmployeeController {
    async createEmployee(req, res) {
        const { name, email, cpf, phone_number, skills } = req.body

        try {
            const employees = await db.query(`SELECT * FROM employee`)
            const employeeExists = employees.some(employee => employee.cpf === cpf)
    
            if (employeeExists) {
                return res.status(400).send({
                    message: "Employee already registered!"
                })
            }
    
            if (!name || !email || !cpf || !skills) {
                return res.send({
                    message: "Invalid or missing data."
                })
            }

            await db.query(`
                INSERT INTO employee(name, email, cpf, phone_number, skills)
                VALUES ('${name}', '${email}', '${cpf}', '${phone_number}', '${skills}'
            );`)

            return res.status(201).send({
                message: "Employee added successfully!",
                body: {
                    employee: { name, email, cpf, phone_number, skills }
                }
            })

        } catch (error) {
            return res.send({
                message: "Error adding employee."
            })
        } 
    }

    async findAllEmployee(req, res) {
        try {
            const employees = await db.query("SELECT * FROM employee ORDER BY name ASC")

            return res.send(employees)

        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: "Error fetching all employees."
            })
        }
    }
}

module.exports = EmployeeController