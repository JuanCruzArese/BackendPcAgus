import { configDotenv } from "dotenv"


export const getVAriables = (options) =>{
    configDotenv({path:"./.env.developement"});
    return {
        port: process.env.PORT,
        mongo: process.env.MONGO,
        secret: process.env.TOKENSECRET
    }
}