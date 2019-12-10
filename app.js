
// mettre les modules à utiliser dans des constantes

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require ('mongoose')
const exphbs = require('express-handlebars')

// expresse dans app pour utiliser express

const app = express();
const port = 2019

// dossier public pour CSS

app.use('/public', express.static(__dirname + '/public'));

// handlebars
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
})); app.set('view engine', 'hbs')

// BodyParser  ( transporteur )
app.use(bodyParser.urlencoded({
    extended: true
}));


// CONNECTION A LA BASE DE DONNES


mongoose.connect("mongodb://localhost:27017/boutiqueGame", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Créer une collection dans la base de donnée
// A/ créer un schema

const productSchema = new mongoose.Schema ({
  title: String,
  content: String
})

// B/ Créer un modèle 

const Product = mongoose.model("product", productSchema)



 // POST method route
  // app.post('/', function (req, res) {
    // res.send('POST request to the homepage');
  // });


// ROUTE pour Affiche avec ID  page nommée "fiche"

// ROUTE
// POST ajouter un produit
app.route("/ajouter-un-article")
.get( (req, res) => {
    res.render("ajouter")
})

app.route("/:id")
.get(function(req, res) {
    Product.findOne(
      {_id: req.params.id},
       function(err, produit){
      if(!err) {
        res.render('fiche', {
          _id: produit.id,
          title: produit.title,
          content: produit.content,
        })
      } else {
        res.send("err")
       }
    })
})









// GET Affiche la liste des produits
app.route("/")
.get ((req, res) => {
  Product.find(function(err, produit) {
    if(!err) {
      res.render('index', {
        product : produit
      })
    }else {
      res.send(err)
    }
  })
})


// port 
app.listen(port, function () {
    console.log(`écoute le port ${port}, lancé à ${new Date().toLocaleString()}`);
})
