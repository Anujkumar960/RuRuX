const mongoose = require("mongoose");

const stream = mongoose.Schema({
    streamId:{type:Number,unique:true},
    name :{type:String,unique:true},
},{versionKey:false})

const StreamModel = mongoose.model('stream',stream);


module.exports={StreamModel}
















