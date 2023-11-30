import { Schema, model } from "mongoose";

const serviceDB = new Schema({
    societe:{type:String,required:true},
    email:{type:String,required:true},
    telephone:{type:String,required:true},
    image:{type:String,required:true},
    pseudo:{type:String,required:true},
    commune:{type:String,required:true},
    statut:{type:Number,default:1},
    password:{type:String,required:true},
    idBrigade:{type: Schema.Types.ObjectId, ref:'Brigade',autopopulate: true, required: true}
},{ timesTamps: true })
export default model("Service", serviceDB)