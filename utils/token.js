import jwt from "jsonwebtoken";

/**
 * 
 * @param {String} user 
 * @returns 
 */
export const genererToken = async (user)=>{
    const JWT_SECRET = process.env.JWT_SECRET;
    if(!JWT_SECRET) throw new Error("Code secret introuvable !!!");
    return jwt.sign(user,JWT_SECRET,{expiresIn:24*3600});
}

/**
 * 
 * @param {String} token 
 * @returns 
 */
export const verifyToken = (token)=>{
    const JWT_SECRET = process.env.JWT_SECRET;
    if(!JWT_SECRET) throw new Error("Code secret introuvable !!!");
    return jwt.verify(token,JWT_SECRET) 
}

