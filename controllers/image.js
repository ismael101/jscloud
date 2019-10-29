const mongoose = require('mongoose')
const fs = require('fs')
const Image = require('../models/image')

exports.getImageInfo = (req,res,next) => {
    Image.find({_ownerid: req.userid})
        .then(images => {
            res.status(200).json({images:images})
        })
        .catch(err => {
            res.status(400).json({error:err})
        })
}

exports.getImage = (req,res,next) => {
    Image.findById(req.params.id)
        .then(image => {
            res.sendFile(image.location)
        })
        .catch(err => {
            res.status(400).json({error:err})
        })
}
exports.createImage = (req,res,next) => {    
    try{
        images = []
        req.files.forEach(image => {
            let newid = new mongoose.Types.ObjectId()
            imagedata = {
                _id:newid,
                _ownerid: req.userid,
                name: image.originalname,
                size: image.size,
                type: image.mimetype,
                location: image.path
            } 
            let newimage = new Image(imagedata)
            images.push(imagedata)
            newimage.save()
        });
        res.status(200).json({
            message:'Image(s) Uploaded',
            images:images
        })
    }   
    catch(err){
        res.status(400).json({
            error:err
        })
    }
}

exports.deleteImage = (req,res,next) => {
    Image.findById(req.params.id)
        .then(image => {
            fs.unlink(image.location, (err) => {
                if(err){
                    res.status(400).json({error:err})
                }
                Image.findByIdAndDelete(req.params.id)
                    .then(() => {
                        res.status(200).json({message:'Image Deleted'})
                    })
                    .catch(err => {
                        res.status(400).json({error:err})
                    })
            })
        })
        .catch(err => {
            res.status(400).json({error:err})

        })
    
}