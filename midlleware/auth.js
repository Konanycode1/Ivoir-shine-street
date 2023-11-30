import { verifyToken } from "../utils/token.js"


export const AUTH = (req,res, next)=>{
    const token = req.Cookie.token;
    console.log(token)
    // const token = req.headers.authorization.split(" ")[1]
    const veryToken = verifyToken(token);
    if(veryToken){
       req.auth = veryToken;
       next()
    }
    else{
        res.redirect('/login')
        console.log("Token inspiré !!")
    }
}