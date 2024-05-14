const mongoose = require("mongoose");

const stream = mongoose.Schema({
    StreamId:{type:Number,unique:true},
    name :{type:String,unique:true},
},{versionKey:false})

const StreamModel = mongoose.model('streams',stream);


module.exports={StreamModel}
















