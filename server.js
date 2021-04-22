const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const router = require('./router')
mongoose.connect('mongodb://127.0.0.1/scheduler' , {useNewUrlParser: true, useUnifiedTopology: true} ).catch(err => console.log('Error connecting to database'))



app.set('view engine' , 'ejs')
app.use(express.static('public'))
app.use('/api', express.static('public'))
app.use('/api/:id', express.static('public'))
app.use(express.urlencoded({ extended : false }))

app.get('/',(req,res)=>{
    res.render( 'index' , context = { 'error' : ''});
})

app.use( '/api' , router );

app.listen( 5000 || process.env.PORT );