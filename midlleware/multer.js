import multer  from "multer";
const mime_type ={
    "image/jpg": "jpg",
    "image/jpeg":"jpeg",
    "image/png":"png"
}
 const  storage =  multer.diskStorage({
    destination: (req, file, callback)=>{
        return callback(null, "images");
    },
    filename: (req,file, callback)=>{
        let name = file.originalname.split(" ").join("_").split("-").join("_");
        const extension = mime_type[file.mimetype];
        callback(null, name+Date.now()+"."+extension);
    }
})

export default multer({storage})