import multer from 'multer';
import path from 'path';

export default multer({
    storage: multer.diskStorage({}),
    fileFilter: (req,file,cb) => {
        const ext = path.extname(file.originalname)
        //console.log(ext)
        if(ext != '.jpg' && ext != '.jpeg' && ext != '.png')
        {
            cb(new Error('invalid file type!'),false)
            return
        }
        cb(null,true)
    }
})