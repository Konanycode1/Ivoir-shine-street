import minister from "../models/minister.js";
import { genererToken } from "../utils/token.js";

class Minister{
    static async create(req, res){
        try {
            await minister.create({
                ...req.body
            })
            res.status(201).json({
                statut: true,
                message:'Minister ajouter'
            })
        } catch (e) {
            res.status(501).json({message: e.message});
        }
    }
    /**
     * 
     * @param {Express.req} req 
     * @param {Express.res} res 
     */
    static async loginMiniter(req,res){
        try{
            
            const {pseudo, password} = req.body;
            const userMinister = await minister.findOne({pseudo:pseudo});
            if(!userMinister){
                res.status(404).json({
                    statut: false,
                    message: 'Identifaint incorrect '
                });
                return;
            }
            if(userMinister.password !== password){
                res.status(404).json({
                    statut: false,
                    message:"Verifier vos informations"
                });
                return;
            }
            res.cookie("token", await genererToken(userMinister.toObject()));
            res.status(200).json({
                statut: true,
                token: await genererToken(userMinister.toObject()),
                message:"Connexion encours"
            })
        }
        catch(e){
            console.log(error);
            res.status(501).json({message: error.message});
        }
    }

    static async getById(req,res){
        const {_id} = req.auth;

        const userMinister = minister.findById(_id);
        if(!userMinister){
            res.staus(404).json({
                statut: false,
                message:'Admin introuvable !!!'
            });
            return;
        }
        res.status(200).json({
            statut: true,
            data:{...userMinister}
        })
    }
}
export default Minister