 const express = require('express')
const auth = require('../auth/auth')
const router = express.Router()
const multer = require('multer')
const fileController = require('../controllers/file')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './uploads/files')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage:storage
})

router.get('/',auth,fileController.getFileInfo)
router.get('/:id',auth,fileController.getFile)
router.post('/',auth, upload.array('files', 10),fileController.createFile)
router.delete('/:id',auth,fileController.deleteFile)

module.exports = router