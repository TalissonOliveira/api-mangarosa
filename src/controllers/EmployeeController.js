const db = require('../config/database')

const formatSkills = require('../scripts/formatSkills')
const { formatCPF, formatPhone_number } = require('../scripts/masks')

class EmployeeController {
    async createEmployee(req, res) {
        const { name, email, cpf, phone_number, skills } = req.body

        try {
            const employees = await db.query(`SELECT * FROM employee`)
            const employeeExists = employees.some(employee => employee.cpf === cpf)
    
            if (employeeExists) {
                return res.status(400).send({
                    message: "Funcionário já cadastrado!",
                    type: "Error"
                })
            }

            const formattedCpf = formatCPF(cpf)

            if (formattedCpf.length !== 14) {
                return res.status(400).send({
                    message: "CPF inválido.",
                    type: "Error"
                })
            }

            const formattedPhone_number = formatPhone_number(phone_number)

            if (formattedPhone_number && formattedPhone_number.length !== 15) {
                return res.status(400).send({
                    message: "Número de telefone inválido.",
                    type: "Error"
                })
            }
    
            if (!name || !email || !cpf || cpf.length > 14 || !skills ) {
                return res.status(400).send({
                    message: "Dados faltando ou inválidos.",
                    type: "Error"
                })
            }

            const formattedSkills = formatSkills(skills)

            await db.query(`
                INSERT INTO employee(name, email, cpf, phone_number, skills)
                VALUES ('${name}', '${email}', '${cpf}', '${phone_number}', '${formattedSkills}'
            );`)

            return res.status(201).send({
                message: "Funcionário registrado com sucesso!",
                body: {
                    employee: { name, email, cpf, phone_number, skills }
                }
            })

        } catch (error) {
            return res.status(400).send({
                message: "Erro ao adicionar funcionário.",
                type: "Error"
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
                message: "Erro ao buscar todos os funcionários.",
                type: "Error"
            })
        }
    }

    async findEmployeeByCpf(req, res) {
        const { cpf } = req.params

        try {
            const employee = await db.query(`SELECT * FROM employee WHERE cpf = '${cpf}'`)

            if (employee.length === 0) {
                return res.status(400).send({
                    message: "Funcionário não existe!",
                    type: "Error"
                })
            }

            return res.send(employee)

        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: "Erro ao buscar dados do funcionário.",
                type: "Error"
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
                    message: "Funcionário não existe!",
                    type: "Error"
                })
            }

            await db.query(`UPDATE employee SET valid = '${valid}' WHERE cpf = '${cpf}'`)

            return res.send({
                message: "Funcionário atualizado com sucesso!",
                body: {
                    employee: {cpf, valid}
                }
            })

        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: "Erro ao atualizar os dados do funcionário.",
                type: "Error"
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
                    message: "Funcionário não existe!",
                    type: "Error"
                })
            }

            await db.query(`DELETE FROM employee WHERE cpf = '${cpf}'`)

            return res.send({
                message: `Funcionário com CPF '${cpf}' deletado com sucesso!`
            })

        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: "Erro ao deletar funcionário.",
                type: "Error"
            })
        }
    }
}

module.exports = EmployeeController