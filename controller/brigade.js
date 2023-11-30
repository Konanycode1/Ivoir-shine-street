import brigade from "../models/brigade.js";
import minister from '../models/minister.js';
import { compareCrypt, crypt } from "../utils/bcrypt.js";
import { genererToken } from "../utils/token.js";

class Brigade{
    static async create(req,res){
        try {
            
            const {_id,role} = req.auth
            const {commune, pseudo,email,image, password, ...body} = req.body;

            const userMinister = await minister.findById(_id);
         
            if(!userMinister && role != "minis"){
                res.status(404).json({
                    statut: false,
                    message:'User not found'
                });
                return;
            }
            const OneBigade = await brigade.findOne({email,pseudo,commune})
            if(OneBigade){
                res.status(302).json({
                    statut: false,
                    message: 'Brigade existe déjà'
                });
                return;
            }
            await brigade.create({
                commune,
                pseudo,
                email,
                password: await crypt(password),
                idMinister: userMinister._id,
                image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                ...body
            })
            res.status(201).json({
                statut: true,
                message: "Brigade crée"
            })
        } catch (e) {
            res.status(500).json({
                statut: false,
                message:`Error-brigade: ${e.message}`
            })
        }
    }
    static async login(req,res){
        try {
            const {pseudo, password} = req.body;
            const userBrigadePseudo = await brigade.findOne({pseudo});
            if(!userBrigadePseudo){
                res.status(404).json({
                    statut: false,
                    message: "Pseudo introuvable"
                })
                return;
            }
            const verif = compareCrypt(password,userBrigadePseudo.password);
            if(!verif){
                res.status(404).json({
                    statut: false,
                    message: "Password incorrect"
                })
                return;
            }
            res.cookie('token',await genererToken(userBrigadePseudo.toObject()))
            res.status(202).json({
                statut: true,
                token: await genererToken(userBrigadePseudo.toObject()),
                message: "connexion encours"
            })
            
        } catch (e) {
            res.status(500).json({
                statut: false,
                message:`Error-brigade: ${e.message}`
            })
        }
       

    }
    static async update (req,res){
        try {
            const {image,password, ...body} = req.body
            const {_id} = req.auth;
            const {id} = req.params;
            const userM = await minister.findById(_id);
            const userB = await brigade.findById(_id);
            const userValable = userM&&!userB?userM:userB&&!userM?userB:undefined;
            if(userValable == undefined){
                res.status(404).json({
                    statut:false,
                    message:'Brigade introuvable !!'
                })
                return
            }
            const userBrigade = await brigade.findById({_id:id});
            
            if(!userBrigade){
                res.status(404).json({
                    statut:false,
                    message:'Brigade introuvable !!'
                })
                return
            }
            if(!image){
                await userBrigade.updateOne({
                    password:password? await crypt(password):userBrigade.password,
                    ...body
                })
                res.status(200).json({
                    statut: true,
                    message:"Modification éffectuée !!"
                })

            }
            else{
                await userBrigade.updateOne({
                    image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                    password:password? await crypt(password):userBrigade.password
                })
                res.status(200).json({
                    statut: true,
                    message:"Modification éffectuée !!"
                })
            }
           
        } catch (error) {
            res.status(500).json({
                statut: false,
                message:`Error-brigade: ${error.message}`
            })
        }
    }
    static async delete(req, res){
        try {
            const id = req.params;
            const {_id} = req.auth;
            const userM = await minister.findById(_id);
            if(!userM){
                res.status(404).json({
                    statut:false,
                    message:"user introuvable !!"
                })
                return;
            }
            let userBrigade = await brigade.findOne({_id:id});
            if(userBrigade){
                res.status(404).json({
                    statut:false,
                    message:"Brigade introuvable !!"
                })
                return;
            }
            await userBrigade.deleteOne({_id:id});
            res.status(200).json({
                statut:true,
                message: "Brigade supprimé !!!"
            })
        } catch (error) {
            res.status(500).json({
                statut: false,
                message:`Error-brigade: ${e.message}`
            })
        }
    }
    
}
export default Brigade