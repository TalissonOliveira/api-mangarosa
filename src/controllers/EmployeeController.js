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

    async findEmployeeByCpf(req, res) {
        const { cpf } = req.params

        try {
            const employee = await db.query(`SELECT * FROM employee WHERE cpf = '${cpf}'`)

            if (employee.length === 0) {
                return res.status(400).send({message: "Employee does not exist!"})
            }

            return res.send(employee)

        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: "Error fetching employee data."
            })
        }
    }

    async updateEmployeeByCpf(req, res) {
        const { cpf } = req.params
        const { valid } = req.body

        try {
            const employee = await db.query(`SELECT * FROM employee WHERE cpf = '${cpf}'`)

            if (employee.length === 0) {
                return res.status(400).send({
                    message: "Employee does not exist!"
                })
            }

            await db.query(`UPDATE employee SET valid = '${valid}' WHERE cpf = '${cpf}'`)

            return res.send({
                message: "Employee updated successfully!",
                body: {
                    employee: {cpf, valid}
                }
            })

        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: "Error updating employee data."
            })
        }
    }

    async deleteEmployeeByCpf(req, res) {
        const { cpf } = req.params

        try {
            const employees = await db.query(`SELECT * FROM employee`)
            const employeeExists = employees.some(employee => employee.cpf === cpf)

            if(!employeeExists) {
                return res.status(400).send({
                    message: "Employee does not exist!"
                })
            }

            await db.query(`DELETE FROM employee WHERE cpf = '${cpf}'`)

            return res.send({
                message: `Employee with CPF '${cpf}' deleted successfully!`
            })

        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: "Error deleting employee."
            })
        }
    }
}

module.exports = EmployeeController