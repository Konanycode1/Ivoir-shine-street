import declaration from "../models/declaration.js";

class Declaration{
    static async create(req,res){
        try {
            await declaration.create({
                ...req.body
            })
            res.status(201).json({
                statut: true,
                message: 'Declaration envoyée !!!'
            })
            
        } catch (e) {
            res.status(201).json({
                statut: true,
                message: 'Declaration envoyée !!!'
            })
        }
        

    }
}
export default Declaration