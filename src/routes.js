const { Router } = require('express');
const routes = Router();

const adminAuth = require("./middlewares/adminAuth");

const categoriesController = require("./controllers/CategoriesController");
const articlesController = require("./controllers/ArticlesController");
const usersController = require("./controllers/UsersController");

routes
.get('/admin/articles', adminAuth, articlesController.index)
.get("/admin/articles/new", adminAuth, articlesController.new)
.post("/articles/save", adminAuth, articlesController.save)
.post("/articles/delete", adminAuth , articlesController.delete)
.get("/admin/articles/edit/:id", adminAuth , articlesController.edit)
.post("/articles/update", adminAuth, articlesController.update)
.get("/articles/page/:num",articlesController.pagination);  

routes
.get("/admin/categories", categoriesController.index)
.get("/admin/categories/new", categoriesController.new)
.post("/categories/save", categoriesController.save)
.post("/categories/delete", categoriesController.delete)
.get("/admin/categories/edit/:id", categoriesController.edit)
.post("/categories/update", categoriesController.update);

routes
.get("/admin/users", usersController.index)
.get("/admin/users/create", usersController.user)
.post("/users/create", usersController.create)
.get("/login", usersController.login)
.post("/authenticate", usersController.authenticate)
.get("/logout", usersController.logout)
.post("/user/delete", usersController.delete);



module.exports = routes;