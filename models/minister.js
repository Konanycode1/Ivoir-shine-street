import { Schema, model } from "mongoose";

const ministerdb = new Schema({
    infos:{type: String, default: "Ministère"},
    pseudo:{type: String, default: "superAdmin"},
    password:{type:String, default: "superAdmin"},
    statut:{type:Number, defaut:1},
    role:{type:String, default: "minis"},
    idBrigade:[
        {
            type: Schema.Types.ObjectId, 
            ref:'Brigade',autopopulate: true, required: true
        }
    ]
})
export default model('Minister', ministerdb);