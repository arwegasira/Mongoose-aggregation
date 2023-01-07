
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const graphicSchema = new Schema({
    graphic:{
        type:String,
        required:true,
        trim: true,
    },
    customer:{
        type:String,
        required:true,
        trim:true,
    },
    owner:{
        type:String,
        required:true,
        trim:true,
    },
    status:{
        type:String,
        required:true,
        trim:true,
    },
    
    revenue:{
        type:Number,
                  default:0,
                  required: true,
    }
},
{ timestamps: true }

)

module.exports = mongoose.model('graphic',graphicSchema);