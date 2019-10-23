const express = require('express')
const auth = require('../auth/auth')
const multer = require('multer')
const router = express.Router()
const imageController = require('../controllers/image')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './uploads/images')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
})

router.get('/',auth,imageController.getImageInfo)
router.get('/:id',auth,imageController.getImage)
router.post('/',auth, upload.array('images', 10),imageController.createImage)
router.delete('/:id',auth,imageController.deleteImage)

module.exports = router