import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import './BodyMeasurePage.scss'

const BodyMeasurePage = () => {
    const navigate = useNavigate()
    const dateRef = useRef(null)
    const weightRef = useRef(0)
    const chestRef = useRef(0)
    const waistRef = useRef(0)
    const hipsRef = useRef(0)
    const thighsRef = useRef(0)
    const bicepsRef = useRef(0)

    const [matmenys, setMatmenys] = useState()

    const measureHandler = (event) => {
        event.preventDefault()

        const newMeasure = {
            date: dateRef.current.value,
            weight: weightRef.current.valueAsNumber,
            chest: chestRef.current.valueAsNumber,
            waist: waistRef.current.valueAsNumber,
            hips: hipsRef.current.valueAsNumber,
            tighs: thighsRef.current.valueAsNumber,
            biceps: bicepsRef.current.valueAsNumber
        }
        setMatmenys(newMeasure)
        
        fetch('http://localhost:3000/progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMeasure)
        })
            .then(async res => {
                if (!res.ok) {
                    throw new Error(await res.text())
                }
                alert('Sėkmingai įvesti duomenis! Galite sekti progreso puslapyje')
                // navigate('/progress')
                return res.json()
            })
            .catch(err => {
                console.error('Nepavyko išsaugoti įvestų matmenų', err.message)
            })
    }
    return (
        <div>
            <h2>Sek savo kūno pokyčius</h2>
            <h5>Įvesk naujausius matmenis ir stebėk progresą laikui bėgant</h5>
            <form onSubmit={measureHandler} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <div style={{display: 'flex', gap: '10px'}}>
                    <label htmlFor="measureDate">Pasirinkite datą</label>
                    <input ref={dateRef}  type="date" />
                </div>
                <div style={{display: 'flex', gap: '10px'}}>
                    <label htmlFor="weightInput">Svoris</label>
                    <input ref={weightRef} type="number" min={30} max={600} id="weightInput"/>
                </div>
                <div style={{display: 'flex', gap: '10px'}}>
                    <label htmlFor="chestInput">Krūtinė</label>
                    <input ref={chestRef} type="number" min={20} max={300} id="chestInput"/>
                </div>
                <div style={{display: 'flex', gap: '10px'}}>
                    <label htmlFor="waistInput">Liemuo</label>
                    <input ref={waistRef} type="number" min={20} max={300} id="waistInput"/>
                </div>
                <div style={{display: 'flex', gap: '10px'}}>
                    <label htmlFor="hipsInput">Klubai</label>
                    <input ref={hipsRef} type="number" min={20} max={300} id="hipsInput"/>
                </div>
                <div style={{display: 'flex', gap: '10px'}}>
                    <label htmlFor="thighsInput">Šlaunis</label>
                    <input  ref={thighsRef}type="number" min={20} max={300} id="thighsInput"/>
                </div>
                <div style={{display: 'flex', gap: '10px'}}>
                    <label htmlFor="bicepsInput">Bicepsas</label>
                    <input ref={bicepsRef} type="number" min={20} max={300} id="bicepsInput"/>
                </div>
                <div>
                    <button type="submit" style={{padding: '10px 20px', cursor: 'pointer'}}>Išsaugoti matmenis</button>
                </div>
            </form>
                {   
                    matmenys &&
                    <div>
                        <p>Paskutiniai įvesties matmenys:</p>
                        <p>Įvesties data: {matmenys.date}</p>
                        <p>Svoris: {matmenys.weight}</p>
                        <p>Krūtinė: {matmenys.chest}</p>
                        <p>Liemuo: {matmenys.waist}</p>
                        <p>Klubai: {matmenys.hips}</p>
                        <p>Šlaunis: {matmenys.thighs}</p>
                        <p>Bicepsas: {matmenys.biceps}</p>
                    </div>
                }
        </div>
    )
}

export default BodyMeasurePage