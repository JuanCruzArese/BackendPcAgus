import { Router } from "express";   
import { userModel } from "../dao/models/user.model.js";
import passport from "passport";
import { creatHash } from "../configuration/bcrypt.js";

const sessionRoutes = Router();

sessionRoutes.post(
    "/register",
    passport.authenticate("register", {failureRedirect: "/fail-register"}),
    (req, res) => {
        res.render("login")
    }
);

sessionRoutes.post(
    "/login",
    passport.authenticate("login", {failureRedirect: "/fail-login"}),
(req, res) => {
    if(!req.user){
        return res.status(401).send({message: "invalid credencials"});
    }
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    res.redirect("/");
}
)

sessionRoutes.post("/logout", (req, res) => {
    req.session.user = null;
    res.redirect("/login")
})

sessionRoutes.post("/recovery", async (req, res) =>{
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).send({message: "error"});
    }
    user.password = creatHash(password);
    user.save();
    res.send({message : "Password changed"})
} )

/*
sessionRoutes.post("/register", async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        if(email === "adminCOder@coder.com"){
            if(password === "adminCod3r123"){
                const user = await userModel.create({
                    first_name, last_name, email, age, password, rol: "admin"
                });
                req.session.user = user;
                return res.redirect("/")  
            }
        }
        const user = await userModel.create({
            first_name, last_name, email, age, password, rol: "usuario"
        });
        req.session.user = user;
        res.redirect("/")
    } catch (error) {
        console.error(error);
        res.status(400).send({error})
    }
});

sessionRoutes.post("/login", async (req, res) =>{ 
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({message: "Usuario no encontrado"});
        }
        if(user.password !== password){
            return res.status(401).send({message: "Datos no validos"})   
        }
        req.session.user = user
        res.redirect("/productos")
    } catch (error) {
        res.status(400).send({error});
    }
})

sessionRoutes.post("/logout", async (req, res) => {
    try {
        req.session.destroy((error) =>{
            if(error){
                return res.status(500).json({message: "logout fallido"})
            }
        });
        res.send({redirect: "http://localhost:8080/login"});
    } catch (error) {
        res.status(400).send({error});
    }
});
*/

export default sessionRoutes