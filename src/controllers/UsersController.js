const User = require("../model/User");
const bcrypt = require('bcryptjs');

module.exports = {
    async index(req, res) {
        User.findAll().then(users => {
            res.render("admin/users/index",{users: users});
        });
    },
    
    async user(req, res) {
        res.render("admin/users/create");
    },

    async create (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        
        User.findOne({where:{email: email}}).then( user => {
            if(user == undefined){
    
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);
                
                User.create({
                    email: email,
                    password: hash
                }).then(() => {
                    res.redirect("/");
                }).catch((err) => {
                    res.redirect("/");
                });
    
    
            }else{
                res.redirect("/admin/users/create");
            }
        });
    },

    async login (req, res) {
        res.render("admin/users/login");
    },
    async authenticate (req, res) {
    
        var email = req.body.email;
        var password = req.body.password;
    
        User.findOne({where:{email: email}}).then(user => {
            if(user != undefined){ // Se existe um usuário com esse e-mail
                // Validar senha
                var correct = bcrypt.compareSync(password,user.password);
    
                if(correct){
                    req.session.user = {
                        id: user.id,
                        email: user.email
                    }
                    res.redirect("/admin/articles");
                }else{
                    res.redirect("/login"); 
                }
    
            }else{
                res.redirect("/login");
            }
        });
    
    },
    async logout (req, res) {
        req.session.user = undefined;
        res.redirect("/");
    },
    async delete (req, res) { //delete
        var id = req.body.id;
    
        if(id != undefined){ 
            if (!isNaN(id)) {
                //deletenado
                User.destroy({
                    where:{
                        id:id
                    }
                }).then(()=>{
                    res.redirect('/admin/users');
                });
    
            }else{ //não for um numero
                res.redirect("/admin/users");
            }
    
        }else{ //null
            res.redirect("/admin/users");
        }
    }
}











