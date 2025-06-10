const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())

app.use(express.json())

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

app.get('/workout-history', async (req, res) => {
    // res.send({message: 'all workouts'})
    const workouts = await Workout.find()
    return res.send({workouts})
})

app.get('/workout-history/:id', async (req, res) => {
    const workout = await Workout.findById(req.params.id)
    // res.send({message: 'single workout', id: req.params.id})
    return res.send(workout)
})

app.post('/workout-history', async (req, res) => {
    const newWorkoutData = new Workout(req.body)
    const insertedDocument = await newWorkoutData.save()
    return res.status(201).send(insertedDocument)
})

app.put('/workout-history/:id', async (req, res) => {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {new: true})    // new: true - kad iskart atvaizduotu nauja irasa
    // res.send({message: 'update workout'})
    return res.send(workout)
})

app.delete('/workout-history/:id', async (req, res) => {
    const workout = await Workout.findByIdAndDelete(req.params.id)
    // res.send({message: 'delete workout'})
    return res.send({message: 'document was deleted'})
})

app.get('/progress', async (req, res) => {
    const progress = await Measure.find()
    return res.send(progress)
})

app.get('/progress/:id', async (req, res) => {
    const measure = await Measure.findById(req.params.id)
    return res.send(measure)
})

app.post('/progress/', async (req, res) => {
    const newMeasure = new Measure(req.body)
    const insertedDocument = await newMeasure.save()
    res.send({message: 'create measurement'})
    return res.status(201).send(insertedDocument)
})

app.put('/progress/:id', async (req, res) => {
    const measure = await Measure.findByIdAndUpdate(req.params.id, req.body, {new: true})
    // res.send({message: 'update measurement'})
    return res.send(measure)
})

app.delete('/progress/:id', async (req, res) => {
    const measure = await Measure.findByIdAndDelete(req.params.id)
    return res.send('document was deleted')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
