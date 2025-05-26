import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

const NewWorkoutPage = () => {
    const navigate = useNavigate()

    const [activity, setActivity] = useState('')
    const [intensity, setIntensity] = useState('')
    const [weight, setWeight] = useState(0)
    const [duration, setDuration] = useState(0)
    const [calories, setCalories] = useState(null)


    const sportActivities = {
        walking: { light: 2.8, moderate: 3.9, intense: 4.3 },
        running: { light: 8, moderate: 9.8, intense: 11 },
        cycling: { light: 4, moderate: 6.8, intense: 8 },
        swimming: { light: 5.8, moderate: 7, intense: 10 },
        yoga: { light: 2.5, moderate: 3.5, intense: 5 },
        pilates: { light: 2, moderate: 3, intense: 4 },
        stretching: { light: 2.5, moderate: 3, intense: 4 },
        aerobics: { light: 4, moderate: 6, intense: 8 },
        hiit: { light: 7, moderate: 9, intense: 11 },
        weights: { light: 3, moderate: 4, intense: 6 },
        crossfit:{ light: 8, moderate: 10, intense: 12 },
        basketball: {light: 3, moderate: 6, intense: 8 },
        football: { light: 7, moderate: 8, intense: 9 },
        boxing: { light: 7, moderate: 8, intense: 10 }
    }

    const activityHandler = (event) => {
        setActivity(event.target.value)
    }

    const lowIntencityHandler = (event) => {
        event.preventDefault()
        setIntensity('light')
    }
    const mediumIntencityHandler = (event) => {
        event.preventDefault()
        setIntensity('moderate')
    }
    const highIntencityHandler = (event) => {
        event.preventDefault()
        setIntensity('intense')
    }

    const durationHandler = (event) => {
        const value = Number(event.target.value)
        setDuration(isNaN(value) ? 0 : value)
    }

    const weightHandler = (event) => {
        const value = Number(event.target.value)
        setWeight(isNaN(value) ? 0 : value)
    }

    const calculateCaloriesHandler = (activity, intensity, weight, duration) => {
        const metValue = sportActivities[activity]?.[intensity]
        const weightNumber = parseFloat(weight)
    
        const burnedCal = Math.round(metValue * weightNumber * 0.0175 * duration)
        setCalories(burnedCal)

        const workout = {
            date: new Date(),
            activity: activity,
            intensity: intensity,
            weight: weight,
            duration: duration,
            burnedCalories: Math.round(burnedCal)
        }

        fetch('http://localhost:3000/workout-history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workout)
        })
            .then(res => {
                if (res.status == 201) {
                    return res.json()
                }
            })
            .then(data => {
                // console.log(data)
                navigate('/new-workout')
            })
    }

    let text = ''
    if (calories < 100) {
        text = 'Mažas žingsnelis - bet žingsnelis į priekį!'
    } else if (calories < 300) {
        text = 'Gražus darbas! Kalorijos išsigando ir pabėgo.'
    } else if (calories < 500) {
        text = 'Tu kaip maža ugnikalnio versija - karšta!'
    } else {
        text = 'Oho! Tu ką tik paleidai raketą iš savo batų!'
    }

    return (
        <div>
            <h2>Jūsų treniruotės kalorijos</h2>
            <p>Pasirinkite sporto šaką ir treniruotės trukmę, kad sužinotumėte, kiek kalorijų sudeginote!</p>
            <form style={{display: 'flex', flexDirection: 'column', gap: '20px', width:'fit-content'}}>
                <select onChange={activityHandler} name="activity" id="activity" defaultValue="Pasirinkti" style={{display: 'flex', gap: '10px'}}>
                    <option value="Pasirinkti" disabled>Pasirinkti</option>
                    <option value="walking">Ėjimas</option>
                    <option value="running">Bėgimas</option>
                    <option value="cycling">Važiavimas dviračiu</option>
                    <option value="swimming">Plaukimas</option>
                    <option value="yoga">Joga</option>
                    <option value="pilates">Pilatesas</option>
                    <option value="stretching">Lankstumo pratimai</option>
                    <option value="aerobics">Aerobika</option>
                    <option value="hiit">HIIT</option>
                    <option value="weights">Svorių kilnojimas</option>
                    <option value="crossfit">CrossFit</option>
                    <option value="basketball">Krepšinis</option>
                    <option value="football">Futbolas</option>
                    <option value="boxing">Boksas</option>
                </select>

                <div className="intensity" style={{display: 'flex', gap: '10px'}}>
                    <label htmlFor="intencity">Intensyvumas</label>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <button onClick={lowIntencityHandler} style={{padding: '5px 10px', cursor: 'pointer'}}>Lengvas</button>
                        <button onClick={mediumIntencityHandler} style={{padding: '5px 10px', cursor: 'pointer'}}>Vidutinis</button>
                        <button onClick={highIntencityHandler} style={{padding: '5px 10px', cursor: 'pointer'}}>Aukštas</button>
                    </div>
                </div>
                <div className="weight" style={{display: 'flex', gap: '10px'}}>
                    <label htmlFor="weight">Įveskite dabartinį svorį</label>
                    <input onChange={weightHandler} type="number" id="weight"/>
                </div>
                <div className="trainingTime" style={{display: 'flex', gap: '10px'}}>
                    <label htmlFor="time">Treniruotės trukmė (min)</label>
                    <input onChange={durationHandler} type="number" id="time"/>
                </div>
            </form>
            <div>
                <button onClick={() => calculateCaloriesHandler(activity, intensity, weight, duration)} disabled={!activity || !intensity || !duration} style={{padding: '10px 20px', cursor: 'pointer', marginTop: '20px'}}>
                    Apskaičiuoti kalorijas
                </button>
            </div>
            {
                calories && (
                <div className="burnedCal">
                    <p style={{fontSize: '24px'}}>{text}</p>
                    <p style={{fontSize: '24px'}}>Sudeginai <strong style={{color: 'blue'}}>{Math.round(calories)}</strong> kalorijų!</p>
                    {/* <p>sporto rekomendacijas _________</p> */}
                </div>
            )}
        </div>
    )

}

export default NewWorkoutPage