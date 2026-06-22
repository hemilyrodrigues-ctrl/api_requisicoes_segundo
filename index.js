const express = require("express");
const fs = require("fs");
const cors = require("cors")
const path = require('path')

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())

const clientesFile = path.join(__dirname, "clientes.json")

function salvarClientes(clientes) {
    fs.writeFileSync(clientesFile, JSON.stringify(clientes, null, 2), "utf-8")

} 

function lerClientes(){
    if (!fs.existsSync(clientesFile)){
        return[];
    }
    const dados=fs.readFileSync(clientesFile,'utf-8')
    try{
        return JSON.parse(dados) || [];
    }
    catch(e){
        return []
    }
}

app.post("/clientes", (req, res) => {
    const { nome, cpf, cep, rua, cidade, estado, numero } = req.body
    if (!nome || !cpf || !cep) {
        return res.status(404).json({ erro: "dados imcompletos " })
    }
    const clientes = lerClientes();
    if (clientes.some(c => c.cpf === cpf)) {
        return res.status(400).json({ erro: "cliente já cadastrado" })
    }
    const novoCliente = { nome, cpf, cep, rua, cidade, estado, numero };
    clientes.push(novoCliente);
    salvarClientes(clientes);
    return res.status(201).json({ mensagem: "cliente cadastrado com susesso" })

})

//http://localhost:3000/saudacao?nome=maria
app.get("/sau", (req, res) => {
    const nome = req.query.nome;
    if (!nome) {
        return res.status(404).json(
            {
                erro: "nome não foi informado"
            }
        )
    }
    res.json(
        {
            mensagem: `saudações ${nome}!`
        }
    )
})

app.post("/media", (req, res) => {
    const { nome2, nota1, nota2 } = req.body

    if (!nome2 || !nota1 || !nota2) {
        return res.status(404).json({ erro: "dados imcompletos" })

    }
    const media = (parseFloat(nota1) + parseFloat(nota2)) / 2

    res.json({
        nome2,
        nota1,
        nota2,
        mensagem: media >= 70 ? "aprovado" : "reprovado",
        media: parseFloat(media)


    })

})

app.post("/imc", (req, res) => {
    const { nome, idade, altura, peso } = req.body

    if (!nome || !idade || !altura || !peso) {
        return res.status(404).json({ erro: "dados imcompletos" })

    }
    const imc = peso / (altura * altura)

    res.json({
        nome,
        idade,
        imc: imc.toFixed(2)
    })


})
app.post("/login", (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(404).json({ erro: "dados incompleto" })
    }
    if (email == 'admin@admin.com' && senha == '123456') {

        res.json(
            {
                token: '123456'
            }
        )
    } else {
        return res.status(404).json({ erro: "dados incorretos" })
    }
})



//finalzao
app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}`)
})