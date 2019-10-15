const express = require('express')
const userController = require('../controllers/user')
const multer = require('multer')
const router = express.Router()

router.post('/login', userController.login)

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/users/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });

  const upload = multer({
    storage: storage,
  });

router.post('/signup', upload.single('profilepic'), userController.signup)

module.exports = router
