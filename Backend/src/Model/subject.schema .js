const mongoose = require("mongoose");

const subjects = mongoose.Schema({
    subjectId:{type:Number,unique:true},
    name :{type:String,unique:true},
    streamId : { type:Number, ref: 'streams'}
},{versionKey:false})
const SubjectModel = mongoose.model('subjects',subjects);


module.exports={SubjectModel}

