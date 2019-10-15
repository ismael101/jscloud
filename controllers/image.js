const mongoose = require('mongoose')
const formidable = require('formidable')
const fs = require('fs')
const Image = require('../models/image')

exports.getImageInfo = (req,res,next) => {
    Image.find({_ownerId: req.userid})
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
            res.download(image.location)
        })
        .catch(err => {
            res.status(400).json({error:err})
        })
}
exports.createImage = (req,res,next) => {    

        const form = new formidable.IncomingForm()
        form.uploadDir = `./uploads/images`
        form.keepExtensions = true
        form.multiples = true
        form.parse(req, (err, fields, files) => {
            if(err){
                res.status(400).json({
                    message:'Error Uploading Images(s)',
                    error:err
                })
            
            }
            if(Array.isArray(files.file)){
                files.file.forEach(file => {
                    let id = new mongoose.Types.ObjectId()
                    let newImage = new Image({
                        _id: id,
                        _ownerId: req.userid,
                        type: file.type,
                        name: file.name,
                        size: file.size,
                        location: file.path,
                        link: `http://localhost:3000/images/${id}`,
                        src: `http://localhost:5000/${file.path}`
                    })
                    console.log()
    
                    newImage.save()
                            .then(() => {
                               console.log('Image Added')
                            })
                            .catch(err => {
                                console.log(err)
                            })
                
                })
            }else{
                let file = files.file
                let id = new mongoose.Types.ObjectId()
                    let newImage = new Image({
                        _id: id,
                        _ownerId: req.userid,
                        type: file.type,
                        name: file.name,
                        size: file.size,
                        location: file.path,
                        link: `http://localhost:3000/images/${id}`,
                        src: `http://localhost:5000/${file.path}`
                    })
                    newImage.save()
                            .then(() => {
                                console.log('success')
                            })
                            .catch(err => {
                                res.status(400).json({error:err})
                            })

            }        
                res.status(200).json({
                    message:'Images Uploaded',
                })
        
        })

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