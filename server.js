const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const users = require('./routes/user')
const files = require('./routes/file')
const images = require('./routes/image')
const path = require('path')
const app = express()

mongoose.connect(`mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@ds235378.mlab.com:35378/cloud_db`,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})
        .then(() => {
            console.log('connected to db')
        })
        .catch(err  => {
            console.log(err)
        })


app.use(cors())
app.use(morgan("dev"));
app.use(express.json())

app.use('/uploads/images', express.static('uploads/images'));
app.use('/uploads/users', express.static('uploads/users'))
app.use('/users', users)
app.use('/files', files)
app.use('/images', images)

app.use(express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.use((req,res,next) => {
	res.status(404).send("Not Found")
})
app.use((err,req,res,next) => {
	console.error(err.stack)
	res.status(500).send("Server Error")
})
app.listen(process.env.PORT,() => {
    console.log(`Server running on port ${process.env.PORT}`)
})
