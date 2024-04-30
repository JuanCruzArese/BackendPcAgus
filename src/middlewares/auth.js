import { isValidPassword } from "../configuration/bcrypt.js";
import { userModel } from "../dao/models/user.model.js";

export const checkAuth = (req, res, next) => {
    if(!req.session.user){
        return res.redirect("/login");
    }
    next()
};

export const CheckExistUser = (req, res, next) => {
    if(req.session.user){
        return res.redirect("/");
    }
    next()
}

export const checkLogin = async (req, res, next) => {
    const { email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user || !isValidPassword(user, password)){
            return res.status(401).send ({message: "Unauthorized"})
        }
        req.user = user;
        next()
    } catch (error) {
        console.error(error)
    }
}

/*
export const checkAuth = (req, res, next) => {
    if(!req.session.user){
        return res.redirect("/login")
    }
    next();
}

export const CheckExistUser = (req, res, next) => {
    if(req.session.user){
        return res.redirect("/");
    }
    next()
}
*/