const express = require('express')
const auth = require('../auth/auth')
const router = express.Router()
const audioController = require('../controllers/audio')

router.get('/',auth,audioController.getAudioInfo)
router.get('/:id',auth,audioController.getAudio)
router.post('/',auth,audioController.createAudio)
router.delete('/:id',auth,audioController.deleteAudio)

module.exports = router