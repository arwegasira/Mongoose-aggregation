
const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
require('dotenv').config();
const Graphic = require('./model/graphic');
const app = express();

//mongoose connect
const connect = (url) => {
    return mongoose.connect(url)
}


const port = process.env.PORT || 3000;

app.get('/', (req, res,next) => {
    res.send('Hello World!');
})

app.get('/graphics/deletemany',async (req, res,next) => {
    try {
        const deleted = await Graphic.deleteMany()
        res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json(error)
    }
})


//aggregate: graphic count by owner in a specific date range
app.get('/graphics/countbyowner',async (req, res, next) => {

    try {
        let graphics = await Graphic.aggregate([
            {
              $match:{'createdAt':{$gte:new Date('09/01/2022'),$lte:new Date('12/01/2022')}}
   
            } ,
            {

              $group:{_id:{owner:'$owner',year:{ $year:'$createdAt'}, month:{ $month:'$createdAt' } } , count:{$sum:1}   }
            },
            {
                $sort:{'_id.year':1,'_id.month':1,'id.owner':1}
            }
          ])
      
          res.status(200).json(graphics);
        
    } catch (error) {

        res.status(400).json(error)
        
    }
})

//aggregate graphic revenue by owner in a specific date range
app.get('/graphics/revenuebyowner',async(req, res, next)=>{
    try {
        const graphics = await Graphic.aggregate([
            {
                  $match:{'createdAt':{$gte:new Date('01/01/2022'),$lte:new Date('12/01/2022')}}
            },
            {
                $group:{_id:{owner:'$owner',year:{$year:'$createdAt'},month:{$month:'$createdAt'}},total:{$sum:'$revenue'}}
    
            },
            {
                $sort:{'_id.year':1,'_id.month':1,'id.owner':1}
            }
        ]);

        
        res.status(200).json(graphics);
    } catch (error) {
        res.status(500).json(error);
    }
})


const start = async()=> {
    try{
        await connect(process.env.MONGO_URI);
        app.listen(port, ()=> console.log(`Server listening on port ${port}`));
    }
    catch(err){
        console.log(err);
    }
}

start();




