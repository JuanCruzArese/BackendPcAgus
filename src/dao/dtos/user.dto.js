import { creatHash } from "../../configuration/bcrypt.js";

class userDto {
    constructor(user){
        this.first_name = user.first_name,
        this.last_name = user.last_name,
        this.email = user.email,
        this.password = creatHash(user.password),
        this.rol = user.rol
    }

    getCurrentUser(){
        return {
            fullName: this.first_name + " " + this.last_name,
            email: this.email,
            rol: this.rol
        }
    }
}

export default userDto