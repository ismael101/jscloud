const express = require('express')
const auth = require('../auth/auth')
const router = express.Router()
const imageController = require('../controllers/image')

router.get('/',auth,imageController.getImageInfo)
router.get('/:id',auth,imageController.getImage)
router.post('/',auth,imageController.createImage)
router.delete('/:id',auth,imageController.deleteImage)

module.exports = router