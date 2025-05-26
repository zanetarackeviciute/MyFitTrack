import { useEffect, useState } from "react"

const WorkoutHistoryPage = () => {
    const [workouts, setWorkouts] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/progress')
        .then((res) => res.json())
        .then((data) => setWorkouts(data.workouts))
    }, [])

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
        {
            workouts.map((workout) => (
                <div key={workout._id} style={{
                    borderRadius: '8px',
                    padding: '20px',
                    marginBottom: '20px',
                    backgroundColor: 'aliceblue',
                    width: '300px'}}>
                    <p>{new Date(workout.date).toLocaleDateString('lt-LT')}</p>
                    <p>Treniruotė - {workout.activity}</p>
                    <p>Trukmė - {workout.duration} min</p>
                    <p>Sudeginta {workout.burnedCalories} kcal</p>
                </div>
            ))
        }
        {
            workouts.length == 0 && 
            <p>Kol kas nėra jokių iššsaugotų treniruočių</p>
        }
    </div>
  )
}

export default WorkoutHistoryPage