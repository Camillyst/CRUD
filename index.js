const express = require("express");
const app = express();
const connection = require("./database/database");
const CadastroBD = require("./database/cadastrobd");
const bodyParser = require("body-parser");

app.use('/css', express.static('css'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static("/"));

connection.authenticate().then(() => {
    console.log("database connect!");
}).catch((erro) => {
    console.log(erro);
});

app.get('../public/css/style.css', (req, res) => {
    res.render('../public/css/style')
})

app.get("/", (req, res) => { 
    CadastroBD.findAll().then((usuarios) => {
        res.render("index", {usuarios: usuarios})
    })
});

app.get("/new", (req, res) => {
    res.render("new")
});


app.post("/save", (req, res) => {
    var nome = req.body.nome
    var sobrenome = req.body.sobrenome
    var email = req.body.email

    CadastroBD.create({
        nome: nome,
        sobrenome: sobrenome,
        Email: email
    }).then(() => {
        res.redirect("/")
    })
});

app.get("/edit/:id", (req, res) => {
    var id = req.params.id;

    CadastroBD.findOne({
        where: { id : id }
    }).then((usuario) => {
        res.render("edit", { usuario: usuario });
    })
});

app.post("/update", (req, res) => {
    var id = req.body.id
    var nome = req.body.nome
    var sobrenome = req.body.sobrenome
    var email = req.body.email

    CadastroBD.update({
        nome: nome,
        sobrenome: sobrenome,
        Email: email
    }, {
        where: { id: id }
    }).then(() => {
        res.redirect("/");
    })
});

app.get("/delete/:id", (req, res) => {
    var id = req.params.id
    
    CadastroBD.destroy({
        where: { id: id}
    }).then(() => {
         res.redirect("/");
    })
});

app.get("/search", (req, res) => {
    var id = req.query.id;
        
    CadastroBD.findOne({
        where: { id : id }
    }).then((usuario) => {
        res.render("search", { usuario: usuario });
    })
});

app.listen(3000, () =>{
    console.log("serven on")
});