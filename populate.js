
require('dotenv').config();
const mongoose = require('mongoose');
const Graphic = require('./model/graphic')

const data = require('./data.json');

const connect = (url)=>{
    return mongoose.connect(url)
}

const start = async() => {
    try {
        await connect(process.env.MONGO_URI)
        await Graphic.insertMany(data)
        console.log('done!!!!!!!')
        console.log(graphic)
    } catch (error) {
        console.error(error)
    }
}

start()