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

app.get('/workout-history', (req, res) => {
    res.send({message: 'all workouts'})
})
app.get('/workout-history/:id', (req, res) => {
    res.send({message: 'single workout'})
})
app.post('/workout-history/:id', (req, res) => {
    res.send({message: 'create workout'})
})
app.put('/workout-history/:id', (req, res) => {
    res.send({message: 'update workout'})
})
app.delete('/workout-history/:id', (req, res) => {
    res.send({message: 'delete workout'})
})

app.get('/progress', (req, res) => {
    res.send({message: 'all measurements'})
})
app.get('/progress/:id', (req, res) => {
    res.send({message: 'single measurement'})
})
app.post('/progress/:id', (req, res) => {
    res.send({message: 'create measurement'})
})
app.put('/progress/:id', (req, res) => {
    res.send({message: 'update measurement'})
})
app.delete('/progress/:id', (req, res) => {
    res.send({message: 'delete measurement'})
})





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
