import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react"
import styles from './HomePage.module.css'
const HomePage = () => {
    // moterims BMR=655+(9.6×svoris)+(1.8× ugis−(4.7×amzius)
    // vyrams BMR=66+(13.7×svoris)+(5×ugis)−(6.8×amzius)

    const navigate = useNavigate()
    const weightRef = useRef()

    const [kmi, setKmi] = useState(0)
    const [bmr, setBmr] = useState(0)

    const [protein, setProtein] = useState(0)
    const [carbs, setCarbs] = useState(0)
    const [fat, setFat] = useState(0)

    const formSubmitHandler = (event) => {
        event.preventDefault()

        // Is formos gaunami duomenys, kada pildyta. Galesiu sekti progresa
        const formData = new FormData(event.target)
        
        let userInfo = {
            gender: formData.get('gender'),
            age: parseInt(formData.get('age')),
            height: parseInt(formData.get('height')),  
            weight: parseInt(formData.get('weight')), 
            activity: formData.get('activityLevel'),
            goal: formData.get('goal')
        }

        if (userInfo.gender == 'Pasirinkti' || userInfo.goal == 'Pasirinkti' || userInfo.activity == 'Pasirinkti') {
            alert('Ne viską užpildėte')
            return
            
        } 
        // apskaiciuojama bazine kaloriju norma
        let BMR = 0
        if (userInfo.gender == 'woman') {
            BMR = parseFloat((655 + (9.6 * userInfo.weight) + (1.8 * userInfo.height) - (4.7 * userInfo.age)).toFixed(1))
        } else {
            BMR = parseFloat((66 + (13.7 * userInfo.weight) + (5 * userInfo.height) - (6.8 * userInfo.age)).toFixed(1))
        }

        // ivertinamas fizinis aktyvumas
        switch (userInfo.activity) {
            case 'sedentary' : BMR = BMR * 1.2; break;
            case 'moderate' : BMR = BMR * 1.375; break;
            case 'active' : BMR = BMR * 1.55; break;
            case 'improveWellbeing' : BMR = BMR * 1.725; break;
        }

        let finalBmr = 0

        // ivertinamas tikslas
        if (userInfo.goal == 'weightLoss') {
            finalBmr = parseInt(BMR * 0.85)
            setProtein(parseInt(finalBmr * 0.35 / 4))
            setCarbs(parseInt(finalBmr * 0.35 / 4))
            setFat(parseInt(finalBmr * 0.3 / 9))
        } else if (userInfo.goal == 'muscleGrow') {
            finalBmr = parseInt(BMR * 1.1)
            setProtein(parseInt(finalBmr * 0.4 / 4))
            setCarbs(parseInt(finalBmr * 0.35 / 4))
            setFat(parseInt(finalBmr * 0.25 / 9))
        } else {
            finalBmr = parseInt(BMR)
            setProtein(parseInt(finalBmr * 0.3 / 4))
            setCarbs(parseInt(finalBmr * 0.45 / 4))
            setFat(parseInt(finalBmr * 0.25 / 9))
        }

        // apskaiciuojamas kmi
        const finalKmi = userInfo.weight / ((userInfo.height / 100) ** 2)
        
        setKmi(parseFloat(finalKmi.toFixed(1)))
        setBmr(parseFloat(finalBmr.toFixed(1)))

        userInfo['bmr'] = parseFloat(finalBmr.toFixed(1))
        userInfo['kmi'] = parseFloat(finalKmi.toFixed(1))

        fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => {
                if (res.status == 201) {
                    return res.json()
                }
            })
            .then(data => {
                // alert('Duomenys sėkmingai įrašyti!')
                navigate('/')
            })

        event.target.gender.value = 'Pasirinkti'
        event.target.age.value = ''
        event.target.height.value = '' 
        event.target.weight.value = '' 
        event.target.activityLevel.value = 'Pasirinkti'
        event.target.goal.value = 'Pasirinkti'
    }

    const getKmiCategory = (kmi) => {
        if (kmi < 18.5) return "per mažas svoris";
        if (kmi < 25) return "normalus svoris";
        if (kmi < 30) return "viršsvoris";
        return "nutukimas";
      }
      
    return (
        <div>
            <h2>Sužinok savo dienos kalorijų normą ir makroelementus</h2>
            <form onSubmit={formSubmitHandler} className="form">
                <div className={styles.blockInfo}>
                    <label htmlFor="gender">Lytis:</label>
                    <select name="gender" id="gender" defaultValue="Pasirinkti">
                        <option value="Pasirinkti" disabled>Pasirinkti</option>
                        <option value="man">Vyras</option>
                        <option value="woman">Moteris</option>
                    </select>
                </div>
                <div className={styles.blockInfo}>
                    <label htmlFor="ageInput">Amžius:</label>
                    <input type="number" name="age" min={10} max={100} id="ageInput"/>
                </div>
                <div className={styles.blockInfo}>
                    <label htmlFor="heightInput">Ūgis:</label>
                    <input type="number" name="height" min={100} max={250} id="heightInput"/>
                </div>
                <div className={styles.blockInfo}>
                    <label htmlFor="weightInput">Svoris:</label>
                    <input ref={weightRef} type="number" name="weight" min={30} max={600} id="weightInput"/>
                </div>
                <div className={styles.blockInfo}>
                    <label htmlFor="activityLevel">Fizinio aktyvumo lygis</label>
                    <select name="activityLevel" id="activityLevel" defaultValue="Pasirinkti">
                        <option value="Pasirinkti" disabled>Pasirinkti</option>
                        <option value="sedentary">Sėdimas</option>
                        <option value="moderate">Vidutinis</option>
                        <option value="active">Aktyvus</option>
                        <option value="veryActive">Labai aktyvus</option>
                    </select>
                </div>
                <div className={styles.blockInfo}>
                    <label htmlFor="goal">Tikslas:</label>
                    <select name="goal" id="goal" defaultValue="Pasirinkti">
                        <option value="Pasirinkti" disabled>Pasirinkti</option>
                        <option value="weightLoss">Numesti svorio</option>
                        <option value="muscleGrow">Priaugti raumeninės masės</option>
                        <option value="improveWellbeing">Pagerinti sveikatą</option>
                    </select>
                </div>
                <div>
                    <button className={styles.btn}>Apskaičiuoti kalorijų normą</button>
                </div>
            </form>
            {
                bmr != 0 && 
                <div className={styles.calorieCalculation}>
                    <p>Jūsų KMI yra {kmi} - <strong>{getKmiCategory(kmi)}</strong></p>
                    <p>Kalorijų norma per dieną: <strong>{bmr}</strong></p>
                    <div className="microelements">Makroelementų paskirstymas:
                        <p>Baltymai: {protein}g</p>
                        <p>Angliavandeniai: {carbs}g</p>
                        <p>Riebalai: {fat}g</p>
                    </div>
                    <p>Norėdami pasiekti norimų rezultatų, stenkitės išlaikyti šią normą ir sekti treniruotes!</p>
                </div>    
                
            }

        </div>
    )
}

export default HomePage