import bcrypt, { compare, hash } from 'bcrypt';

/**
 * 
 * @param {String} pass 
 */
export const crypt = async (pass)=>{
        //const salt = ;
       return await hash(pass, await bcrypt.genSalt(10));
}

/**
 * 
 * @param {String} to 
 * @param {StringConstructor} from 
 * @returns 
 */
export const compareCrypt =(to,from)=>{
    try {
        return compare(to,from);
        
    } catch (e) {
        console.log("Error-Compare:",e.message)
    }
}