const path = require('path')
const express = require('express')
const multer = require('multer')
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`) //path gets the original extension with this method
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase()) //test extension of submitted file (returns boolean) 
    const mimetype = filetypes.test(file.mimetype)  //every file has a mime type (like a signature) - returns boolean

    if(extname && mimetype) {
        return cb(null, true)
    } else {
        cb("Images Only")
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})

router.post('/', upload.single('image'), (req, res) => {
  
    res.send(`/${req.file.path}`)
})

module.exports = router