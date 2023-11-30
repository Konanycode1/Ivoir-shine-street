import { Schema, model } from "mongoose";

const declarationDB = new Schema({
    image:{type:String,required:true},
    description:{type:String,required:true},
    commune:{type:String,required:true},
    localisation:{type:String,required:true},
    statut:{type:Number,default:1},
    date:{type:Date,default: Date.now}
},
{ timesTamps: true })

export default model("Declaration", declarationDB)