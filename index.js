const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

//clientes
const clientesFile = path.join(__dirname, "clientes.json")

function salvarClientes(clientes) {
    fs.writeFileSync(clientesFile, JSON.stringify(clientes, null, 2), "utf-8")
}

function lerClientes() {
    if (!fs.existsSync(clientesFile)) {
        return [];
    }
    const dados = fs.readFileSync(clientesFile, 'utf-8')
    try {
        return JSON.parse(dados) || [];
    }
    catch (e) {
        return []
    }
}


app.post("/clientes", (req, res) => {
    const { nome, cpf, cep, rua, cidade, estado, numero } = req.body;
    if (!nome || !cpf || !cep) {
        return res.status(404).json({ erro: "dados incompletos" })
    }
    const clientes = lerClientes();
    if (clientes.some(c => c.cpf === cpf)) {
        return res.status(400).json({ erro: "cliente já cadastrado" })
    }
    const novoCliente = { nome, cpf, cep, rua, cidade, estado, numero };
    clientes.push(novoCliente);
    salvarClientes(clientes);
    return res.status(201).json({
        mensagem: "cliente cadastrado com sucesso"

    })
})



//usuarios

const usuariosFile = path.join(__dirname, "usuarios.json")

function salvarClientes(usuarios) {
    fs.writeFileSync(usuariosFile, JSON.stringify(usuarios, null, 2), "utf-8")
}

function lerUsuarios() {
    
    if (!fs.existsSync(usuariosFile)) {
        return [];
    }
    const dados = fs.readFileSync(usuariosFile, 'utf-8')
    try {
        return JSON.parse(dados) || [];
    }
    catch (e) {
        return []
    }
}


app.post("/usuarios", (req, res) => {
    const { nome, email, senha } = req.body;
    if (!senha || !email || !nome) {
        return res.status(404).json({ erro: "dados incompletos" })
    }
    const usuarios = lerUsuarios();
    if (usuarios.some(U => U.email === email)) {
        return res.status(400).json({ erro: "usuario já cadastrado" })
    }
    const novoUsuario = { nome, email, senha };
    usuarios.push(novoUsuario);
    salvarC(usuarios);
    return res.status(201).json({
        mensagem: "usuario cadastrado com sucesso",token:"123456"

    })
})

//http://localhost:3000/saudacao?nome=talhia


app.post("/login", (req, res) => {
    console.log(req.body)
    const { email, senha } = req.body;



    if (!email || !senha) {
        return res.status(404).json({ erro: "dados incompleto" })
    }
    if (email === 'admin@admin.com' && senha === '123456') {
        res.json(
            {
                token: "123456"
            }
        )
    } else {
        return res.status(404).json({ erro: "dados incorretos" })
    }



})




//finalzão
app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}`)
})