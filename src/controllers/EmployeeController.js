const db = require('../config/database')

const formatSkills = require('../scripts/formatSkills')
const { formatCPF, formatPhone_number } = require('../scripts/masks')

class EmployeeController {
    async createEmployee(req, res) {
        const { name, email, cpf, phone_number, skills } = req.body
        const formattedCpf = formatCPF(cpf)
        const formattedPhone_number = formatPhone_number(phone_number)
        const formattedSkills = formatSkills(skills)

        try {
            const employees = await db.query(`SELECT * FROM employee`)
            const employeeExists = employees.some(employee => employee.cpf === formattedCpf)
    
            if (employeeExists) {
                return res.status(400).send({
                    message: "Funcionário já cadastrado!",
                    type: "Error"
                })
            }

            // Verificar se o CPF é válido
            if (formattedCpf.length !== 14) {
                return res.status(400).send({
                    message: "CPF inválido.",
                    type: "Error"
                })
            }

            // Verificar se o telefone é válido
            if (formattedPhone_number && formattedPhone_number.length !== 15) {
                return res.status(400).send({
                    message: "Número de telefone inválido.",
                    type: "Error"
                })
            }
            
            // Verificar se falta algum dado é válido
            if (!name || !email || !cpf || !skills ) {
                return res.status(400).send({
                    message: "Dados faltando ou inválidos.",
                    type: "Error"
                })
            }

            await db.query(`
                INSERT INTO employee(name, email, cpf, phone_number, skills)
                VALUES ('${name}', '${email}', '${formattedCpf}', '${formattedPhone_number}', '${formattedSkills}'
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
            res.status(500).send({
                message: "Erro ao buscar todos os funcionários.",
                type: "Error"
            })
        }
    }

    async findEmployeeByCpf(req, res) {
        const { cpf } = req.params
        const formattedCpf = formatCPF(cpf)

        try {
            const employee = await db.query(`SELECT * FROM employee WHERE cpf = '${formattedCpf}'`)

            // Verificar se o funcionário existe
            if (employee.length === 0) {
                return res.status(400).send({
                    message: "Funcionário não existe!",
                    type: "Error"
                })
            }

            return res.send(employee)

        } catch (error) {
            res.status(500).send({
                message: "Erro ao buscar dados do funcionário.",
                type: "Error"
            })
        }
    }

    async updateEmployeeByCpf(req, res) {
        const { cpf } = req.params
        const { valid } = req.body
        const formattedCpf = formatCPF(cpf)

        try {
            const employee = await db.query(`SELECT * FROM employee WHERE cpf = '${formattedCpf}'`)

            // Verificar se o funcionário existe
            if (employee.length === 0) {
                return res.status(400).send({
                    message: "Funcionário não existe!",
                    type: "Error"
                })
            }

            await db.query(`UPDATE employee SET valid = '${valid}' WHERE cpf = '${formattedCpf}'`)

            return res.send({
                message: "Funcionário atualizado com sucesso!",
                body: {
                    employee: {cpf: formattedCpf, valid}
                }
            })

        } catch (error) {
            res.status(500).send({
                message: "Erro ao atualizar os dados do funcionário.",
                type: "Error"
            })
        }
    }

    async deleteEmployeeByCpf(req, res) {
        const { cpf } = req.params
        const formattedCpf = formatCPF(cpf)

        try {
            const employees = await db.query(`SELECT * FROM employee`)
            const employeeExists = employees.some(employee => employee.cpf === formattedCpf)

            if(!employeeExists) {
                return res.status(400).send({
                    message: "Funcionário não existe!",
                    type: "Error"
                })
            }

            await db.query(`DELETE FROM employee WHERE cpf = '${formattedCpf}'`)

            return res.send({
                message: `Funcionário com CPF '${formattedCpf}' deletado com sucesso!`
            })

        } catch (error) {
            res.status(500).send({
                message: "Erro ao deletar funcionário.",
                type: "Error"
            })
        }
    }
}

module.exports = EmployeeController