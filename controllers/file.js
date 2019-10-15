const mongoose = require('mongoose')
const formidable = require('formidable')
const fs = require('fs')
const File = require('../models/file')

exports.getFileInfo = (req,res,next) => {
    File.find({_ownerId: req.userid})
        .then(files => {
            res.status(200).json({files:files})
        })
        .catch(err => {
            res.status(400).json({error:err})
        })
}
exports.getFile = (req,res,next) => {
    File.findById(req.params.id)
        .then(file => {
            res.download(file.location)
        })
        .catch(err => {
            res.status(400).json({error:err})
        })
}
exports.createFile = (req,res,next) => {    

        const form = new formidable.IncomingForm()
        form.uploadDir = `./uploads/files`
        form.keepExtensions = true
        form.multiples = true
        form.parse(req, (err, fields, files) => {
            if(err){
                res.status(400).json({
                    message:'Error Uploading File(s)',
                    error:err
                })
            
            }
            if(Array.isArray(files.file)){
                files.file.forEach(file => {
                    let id = new mongoose.Types.ObjectId()
                    let newFile = new File({
                        _id: id,
                        _ownerId: req.userid,
                        type: file.type,
                        name: file.name,
                        size: file.size,
                        location: file.path,
                        link: `http://localhost:3000/files/${id}`
                    })
    
                    newFile.save()
                            .then(() => {
                               console.log('File Added')
                            })
                            .catch(err => {
                                console.log(err)
                            })
                
                })
            }else{
                let file = files.file
                let id = new mongoose.Types.ObjectId()
                    let newFile = new File({
                        _id: id,
                        _ownerId: req.userid,
                        type: file.type,
                        name: file.name,
                        size: file.size,
                        location: file.path,
                        link: `http://localhost:3000/files/${id}`
                    })
    
                    newFile.save()
                            .then(() => {
                               console.log('File Added')
                            })
                            .catch(err => {
                                res.status(400).json({error:err})
                            })
            }           
                res.status(200).json({
                    message:'Files Uploaded',
                })
        
        })

}

exports.deleteFile = (req,res,next) => {
    File.findById(req.params.id)
        .then(file => {
            fs.unlink(file.location, (err) => {
                if(err){
                    res.status(400).json({error:err})
                }
                File.findByIdAndDelete(req.params.id)
                    .then(() => {
                        res.status(200).json({message:'File Deleted'})
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