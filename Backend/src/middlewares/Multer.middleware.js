import multer from "multer"

export const uploadMiddleWare = multer({dest:'Uploads/'})