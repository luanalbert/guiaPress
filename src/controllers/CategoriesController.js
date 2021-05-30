const Category = require("../model/Category");
const slugify = require("slugify")

module.exports = {
    async new(req, res){
        res.render("admin/categories/new");
    },
    async save (req, res){ //create
        let title = req.body.title;
        
        if(title != undefined){ //não vai cadastrar valor null
    
            Category.create({
                title: title,
                slug: slugify(title)
            }).then(() =>{
                res.redirect("/admin/categories");
            })
    
        }else{
            res.redirect("/admin/categories/new");
        }
    },
    
    async index (req, res){

        Category.findAll().then( categories => {
            res.render("admin/categories/index", {categories:categories});
        });
    },
    async delete (req, res){ 
        var id = req.body.id;
    
        if(id != undefined){ 
            if (!isNaN(id)) {
                //deletenado
                Category.destroy({
                    where:{
                        id:id
                    }
                }).then(()=>{
                    res.redirect('/admin/categories');
                });
    
            }else{ //não for um numero
                res.redirect("/admin/categories");
            }
    
        }else{ //null
            res.redirect("/admin/categories");
        }
    },
    async edit(req, res){
        let id = req.params.id;
    
        if(isNaN(id)){
            res.redirect("/admin/categories");
        }
    
        Category.findByPk(id).then(category => {
            if(category != undefined){
    
                res.render("admin/categories/edit",{category:category})
    
            }else{
              res.redirect("/admin/categories");  
            }
        }).catch(erro =>{ 
            res.redirect("/admin/categories"); 
        })
    },
    async update (req, res){
        let id = req.body.id;
        let title = req.body.title;
    
        Category.update({title:title, slug: slugify(title)},{
            where: {
                id:id,
                
            }
        }).then(()=>{
            res.redirect("/admin/categories"); 
        });
    }
}





