import brigade from "../models/brigade.js";
import service from "../models/service.js";
import { crypt, compareCrypt } from "../utils/bcrypt.js";
import { genererToken } from "../utils/token.js";

class Service {

    static async insertService(req,res){
        try {
            const {email, commune, telephone, pseudo,password,...body} = req.body;
            const {_id} = req.auth;
            const userBrigade = await brigade.findById(_id) ;
            if(!userBrigade){
                res.status(404).json({
                    statut: false,
                    message:'brigade introhvable !!!'
                })
                return
            }
            const verifyService = await service.findOne({email, commune, telephone, pseudo});
            if(verifyService){
                res.status(404).json({
                    statut: false,
                    message: "Service existe déjà !!!"
                })
                return
            }
            await service.create({
                email,
                pseudo,
                telephone,
                commune,
                password:crypt(password),
                ...body
            })
            res.status(200).json({
                statut: true,
                message: 'Service de ramassage ajouté !!'
            })

        } catch (e) {
            res.status(500).json({
                statut: false,
                message: `Erreur service: ${e.message}`
            })
        }
    }
    static async modificationService(req,res){
       try {
            const id = req.params;
            const {_id} = req.auth;
            const {password, pseudo, ...rest} = req.body;
            
            const userBrigade = await brigade.findById(_id);
            if(!userBrigade){
                res.status(404).json({
                    statut:false,
                    message:'Brigade introuvable !!!'
                })
                return
            }
            const userService = await service.findOne({_id:id});
            if(!userService){
                res.status(404).json({
                statut: false,
                message: 'Service introuvable'
                })
                return
            }
            await userService.updateOne({
                pseudo:pseudo,
                password: await password?crypt(password):userService.password,
                ...rest

            })
            res.status(200).json({
                statut:true,
                message:'Modification effectuée !!!'
            })
       } catch (e) {
            res.status(500).json({
                statut: false,
                message: `Erreur service: ${e.message}`
            })
       }
    }
    static async deleteService(req,res){
        try {
            const {_id} = req.auth;
            const id  = req.params;
            const userBrigade = await brigade.findById(_id);

            if(!userBrigade){
                res.status(404).json({
                    statut: false,
                    message: `Vous n'est pas autorisé`
                })
                return
            }
            const userService = await service.findOne({_id:id});
            if(!userService){
                res.status(404)
                .json({
                    statut:false,
                    message:'Service introuvable !!'
                })
                return;

            }
            await userService.deleteOne({_id:id})
            res.status(200)
            .json({
                statut:true,
                message:'Service supprimé !!'
            })

            
        } catch (e) {
            res.status(500).json({
                statut: false,
                message:  `Erreur service: ${e.message}`
            })
            
        }
        
    }
    static async loginService(req,res){
        const {pseudo, password} = req.body;
        const userservice = await service.findOne({pseudo});
        if(!userservice){
            res.status(404).json({
                statut: false,
                message:'votre pseudo est incorrect'
            })
            return
        }
        const verifpass = compareCrypt(password, userservice.password)
        if(!verifpass){
            res.status(404).json({
                statut:false,
                message:'Password incorrect'
            })
            return 
        }
        res.cookie('token',genererToken(userservice.toObject()));
        res.status(200).json({
            statut:false,
            token:genererToken(userservice.toObject()),
            message: 'connexion encours '
        })
    }

}
export default Service;