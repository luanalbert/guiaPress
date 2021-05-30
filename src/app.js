const express = require("express");
const app = express();

const routes = require('./routes'); 

const connection = require("./database/database");

const bodyParser = require("body-parser");
const session = require("express-session");

const Article = require("./model/Article");
const Category = require("./model/Category");
const User = require("./model/User");

// View engine
app.set('view engine','ejs');

// Sessions
app.use(session({
    secret: "catDog",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }  // 1 hour (in milliseconds)
})); 

// Static
app.use(express.static('src/public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes
app.use(routes);

// Database connection
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    })

    
app.get("/", (req, res) => {
    Article.findAll({
        order:[
            ['id','DESC']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        });
    });
})

app.get("/:slug",(req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    });
})

app.get("/category/:slug",(req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then( category => {
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render("index",{articles: category.articles,categories: categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    })
})

module.exports = app;