const mongoose = require("mongoose");


const marks = mongoose.Schema({
    Id:{type:Number,unique:true},
    studentName : { type: Number, ref: 'students'},
    streamId : { type:Number , ref: 'streams'},
    subjectId : { type:Number, ref: 'subjects'},
    marks :{type:Number}
},{versionKey:false})
const MarksModel = mongoose.model('marks',marks);


module.exports={ MarksModel}
