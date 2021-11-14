const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { contextsKey } = require('express-validator/src/base');


const app = express();
const DB = "mongodb+srv://project4:project4@cluster0.cdprr.mongodb.net/inotebook?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("Connected to Database")
}).catch((err)=>{
    console.log(err.message);
})

app.use(cors())
//routes
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(5000,()=>{
    console.log(`listening on 5000`)
})