const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/myFitTrack')

const database = mongoose.connection

database.on('error', (err) => console.log(err))
database.once('open', () => console.log('Successfully connected to DB'))

const macrosSchema = new mongoose.Schema({
    gender: String,
    age: Number,
    height: Number,  
    weight: Number, 
    activity: String,
    goal: String
})
const Macros = mongoose.model('Macros', macrosSchema)

const workoutSchema = new mongoose.Schema ({
    date: Date,
    activity: String,
    intensity: String,
    weight: Number,
    duration: Number,
    burnedCalories: Number
})
const Workout = mongoose.model('Workout', workoutSchema)

const measureSchema = new mongoose.Schema ({
    date: Date,
    weight: Number,
    chest: Number,
    waist: Number,
    hips: Number,
    tighs: Number,
    biceps: Number
})
const Measure = mongoose.model('Measure', measureSchema)



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
