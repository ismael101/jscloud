const express = require('express')
const auth = require('../auth/auth')
const router = express.Router()
const fileController = require('../controllers/file')

router.get('/',auth,fileController.getFileInfo)
router.get('/:id',auth,fileController.getFile)
router.post('/',auth,fileController.createFile)
router.delete('/:id',auth,fileController.deleteFile)

module.exports = router