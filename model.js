const mongoose = require('mongoose')


const schedulerSchema = new mongoose.Schema({

    username : {
        type: String,
        required : true
    },
    events : {
        type : [Object]
    }
})


module.exports = new mongoose.model('schedulerModel', schedulerSchema )