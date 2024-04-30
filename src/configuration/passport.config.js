import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { userModel } from "../dao/models/user.model.js";
import { creatHash, isValidPassword } from "./bcrypt.js";

const initialPassport = () => {
        passport.use("register", new  localStrategy(
            {passReqToCallback: true, usernameField: "email"},
            async (req, username, password, done) => {
                const {first_name, last_name, email, age} = req.body;
                try {
                    const user = await userModel.findOne({email});
                    if(user){
                        console.log("User already exists");
                        return done(null, false)
                    }
                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        rol: "usuario",
                        password : creatHash(password)
                    }
                    const result = await userModel.create(newUser)
                    return done(null, newUser)
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use("login", new localStrategy(
        { usernameField: "email"},
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({email: username});
                if(!user || !isValidPassword(user, password)){
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.serializeUser((user, done) =>{
        done(null, user);
    });

    passport.deserializeUser(async (id, done) =>{
        const user = await userModel.findOne({_id: id });
        done(null, user._id);
    });
};

export default initialPassport