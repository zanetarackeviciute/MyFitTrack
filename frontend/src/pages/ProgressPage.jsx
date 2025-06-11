import { useState, useEffect } from "react"
import './ProgressPage.scss'

const ProgressPage = () => {
    const [progressData, setProgressData] = useState()

    useEffect(() => {
        fetch('http://localhost:3000/progress')
        .then((res) => res.json())
        .then((data) => setProgressData(data.progressData))
        .catch ((err) => console.error('Klaida', err))
    }, [])
    
    return (
        <div>
            <h2>Stebėk savo kūno pokyčius</h2>
            {
                progressData && progressData.users.length > 0 ? (
                <div>
                    <h4>Jūsų matmenys</h4>
                    {/* {
                        progressData.users.map((user, index) => {
                            return (
                            <div key={index}>
                                <p>Amžius: {user.age} m</p>
                                <p>Svoris: {user.weight} kg</p>
                                <p>Ūgis: {user.height} cm</p>
                                <p>BMR: {user.bmr}</p>
                                <p>KMI: {user.kmi}</p>
                            </div>
                            )
                        })
                    } */}

                    
                    {
                        progressData.measures.length > 0 &&
                        <>
                            {/* <h3>Matmenys:</h3> */}
                            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                            { progressData.measures.map((measure) => (
                                    <div key={measure._id} style={{
                                        borderRadius: '8px',
                                        padding: '20px',
                                        marginBottom: '20px',
                                        backgroundColor: 'aliceblue',
                                        width: '300px'
                                      }}>
                                        <p>Data: {new Date(measure.date).toLocaleDateString()}</p>
                                        <p>Svoris: {measure.weight} kg</p>
                                        <p>Krūtinė: {measure.chest} cm</p>
                                        <p>Liemuo: {measure.waist} cm</p>
                                        <p>Klubai: {measure.hips} cm</p> 
                                        <p>Šlaunis: {measure.tighs} cm</p>
                                        <p>Bicepsas: {measure.biceps} cm</p>
                                    </div>
                            ))}
                            </div>
                        </>
                    }
                </div>
            ) : (
                <p>Kol kas nėra duomenų...</p>
            )}
        </div>
    )
}

export default ProgressPage

