
<h1 align="center">
  <p>api-mangarosa</p>
</h1>

<p align="center">
<img alt="GitHub language count" src="https://img.shields.io/github/languages/count/TalissonOliveira/api-mangarosa?style=flat-square">

<img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/TalissonOliveira/api-mangarosa?style=flat-square">

<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/TalissonOliveira/api-mangarosa?style=flat-square">

<img alt="GitHub" src="https://img.shields.io/github/license/TalissonOliveira/api-mangarosa?style=flat-square">
</p>

<p align="center">
    <a href="#book-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#information_source-como-utilizar">Como utilizar</a>
</p>

## :book: Sobre
API criada com Node.js e com banco de dados Postgres para cadastro e gerenciamento de funcionários.

## :rocket: Tecnologias

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [node-postgres](https://node-postgres.com/)

## :information_source: Como utilizar
Para utilizar a API é necessário criar um banco de dados  no PostgreSQL.
Após ter criado, utilize a query abaixo para criar uma tabela:
```sql
CREATE  TABLE employee (
	id SERIAL  NOT  NULL  PRIMARY  KEY,
	name  VARCHAR(100) NOT  NULL,
	email VARCHAR(100) NOT  NULL,
	cpf VARCHAR(14) NOT  NULL,
	phone_number VARCHAR(15),
	skills VARCHAR[] NOT  NULL
	valid boolean  NOT  NULL  DEFAULT False
)
```

Depois crie um arquivo <code>.env</code> na raiz do projeto e adicione as seguintes variáveis:
```bash
USER=your_postgres_user
HOST=your_host
DATABASE=name_of_your_database
PASSWORD=your_postgres_password
DATABASE_PORT=your_database_port
```
Exemplo de arquivo <code>.env</code>
```bash
USER='postgres'
HOST='localhost'
DATABASE='database_name'
PASSWORD='password'
DATABASE_PORT=5432
```

Na linha de comando:
```bash
# Clonar o repositório
$ git clone https://github.com/TalissonOliveira/api-mangarosa.git

# Entrar no diretório
$ cd api-mangarosa

# Baixar as dependências
$ yarn install

# Executar o servidor
$ yarn dev
```
Feito isso, o servidor irá rodar na porta <code> 3333</code>

## :airplane: Rotas
* GET
	* `http://localhost:3333/employee` - Listar todos os funcionários cadastrados
	* `http://localhost:3333/employee/00000000000` - Listar funcionário por CPF
* POST
	* `http://localhost:3333/employee` - Registrar novo funcionário
	```json
	// Exemplo de body
	{
		"name": "John Doe",
		"email": "john@doe.com",
		"cpf": "000.000.000-00",
		"phone_number": "(99) 99999-9999",
		"skills": "{Git, React}"
	}
	```
* PATCH
	* `http://localhost:3333/employee/00000000000` - Atualizar  status do funcionário
	```json
	// Exemplo de body
	{
		"valid": "true"
	}
	```
* DELETE
	* `http://localhost:3333/employee/00000000000` - Deletar funcionário
---

Feito com :heart: por Talisson Oliveira
