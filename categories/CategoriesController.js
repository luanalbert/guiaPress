const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify")


router.get("/admin/categories/new", (req, res)=>{
    res.render("admin/categories/new");
});

router.post("/categories/save", (req, res)=>{ //create
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
});

router.get("/admin/categories", (req, res)=>{//listagem

    Category.findAll().then( categories => {
        res.render("admin/categories/index", {categories:categories});
    });
});

router.post("/categories/delete", (req, res)=>{ //delete
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
});

router.get("/admin/categories/edit/:id",(req, res)=>{ //edição
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
    }).catch(erro =>{ // se acontecer algum erro na hora da busca
        res.redirect("/admin/categories"); 
    })
});

router.post("/categories/update",(req, res)=>{//update
    let id = req.body.id;
    let title = req.body.title;

    Category.update({title:title, slug: slugify(title)},{
        where: {
            id:id,
            
        }
    }).then(()=>{
        res.redirect("/admin/categories"); 
    });
});




module.exports = router;