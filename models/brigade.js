import { Schema, model } from "mongoose";

const brigadeDB = new Schema({
    nom:{type:String,required:true},
    image:{type:String,required:true},
    telephone:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    pseudo:{type:String,required:true},
    password:{type:String,required:true},
    commune:{type:String,required:true},
    idMinister:{type: Schema.Types.ObjectId, ref:'Minister',autopopulate: true, required: true}
},
{ timesTamps: true }
)
export default model('Brigade', brigadeDB);