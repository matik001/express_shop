import multer from "multer";


export const imageStorage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'upload/images');
    },
    filename: (req, file, cb)=>{
        cb(null, `${file.originalname}`);
    },
});
    