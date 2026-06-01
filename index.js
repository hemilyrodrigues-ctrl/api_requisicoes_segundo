const express = require("express");
const fs = require("fs");
const cors = require("cors")

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())

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
    
    if (!nome2 || !nota1 || !nota2 )
        
     {
        return res.status(404).json({ erro: "dados imcompletos" })

    }
    const media =  (parseFloat(nota1)  + parseFloat(nota2))/2 
   
    res.json({
        nome2,
        nota1,
        nota2,
        mensagem: media >=70? "aprovado":"reprovado",
        media: parseFloat(media)
        
       
    })
   
})
app.post("/imc", (req, res) => {
    const { nome, idade, altura, peso } = req.body
    
    if (!nome || !idade || !altura ||!peso )
        
     {
        return res.status(404).json({ erro: "dados imcompletos" })

    }
    const imc =  peso /(altura*altura)
   
    res.json({
        nome,
        idade,
        imc: imc.toFixed(2)
    })
    
   
})
app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (!email && !senha) {
        return res.status(404).json({ erro: "Dados incompletos" })
    }

    if (email == "admin@admin.com" || senha == "123456") {
        return res.status(200).json({ token: "123456" })
    }
    else( 
        res.status(404).json({ erro: "Usuario não encontrado" }) 
    )

}) 
    
   

//finalzao
app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}`)
})