import { useRef, useState } from 'react'
import './HomePage.scss'
// import logo from '../assets/MyFitTrackLogo.png'
const HomePage = () => {
    const regPasswordRef = useRef()
    const regPasswordRepeatRef = useRef()
    const [email, setEmail] = useState('')
    const regNameRef = useRef()

    const [showRegForm, setShowRegForm] = useState(false)
    const [showSignIn, setShowSignIn] = useState(false)

    const handleRegisterClick = () => {
        setShowSignIn(false)
        setShowRegForm(true)
    }

    const handleSignIn = () => {
        setShowSignIn(true)
        setShowRegForm(false)
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        console.log('email -', email, 'passwrd - ', regPasswordRef.current.value, regPasswordRepeatRef.current.value)

        if (!regNameRef.current.value.trim()) {
            alert('Įveskite vardą')
            return
        }
        if (regPasswordRef.current.value.length < 8 || regPasswordRef.current.value.length > 20 || regPasswordRepeatRef.current.value.length < 8 || regPasswordRepeatRef.current.value.length > 20) {
            alert('Slaptažodžio ilgis turi būti nuo 8 iki 20 simbolių.')
            return;
        } 
        if (regPasswordRef.current.value !== regPasswordRepeatRef.current.value) {
            alert('Slaptažodžiai nesutampa!')
            return;
        } 
        alert('Sveikiname! Jūsų registracija sėkmninga!')
        setShowRegForm(false)
        

        setEmail('')
        regNameRef.current.value = ''
        regPasswordRef.current.value = ''
        regPasswordRepeatRef.current.value = ''
    }

    const handleClose = () => {
        setShowRegForm(false)
        setShowSignIn(false)
    }



    return (
        <div className='home-text'>
            <div className='welcome-text'>
                <h1>Sveikas atvykęs į <strong>MyFitTrack</strong>!</h1>
                <hr></hr>
                <h4>Pradėk naują treniruotę, sek savo kūno apimtis arba peržiūrėk pažangą.</h4>
            </div>
            <div className='buttons'>
                <button onClick={handleRegisterClick}>Registruotis</button>
                <button onClick={handleSignIn}>Prisijungti</button>
            </div>
            { showRegForm && (
                <div className='overlay' onClick={handleClose}>
                    <div className='registration' onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleRegisterSubmit}>
                            <div className="mb-3 row">
                                <h3>Registracija</h3>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputName" className="col-sm-2 col-form-label">Įveskite vardą</label>
                                <div className="col-sm-10">
                                    <input type="text" ref={regNameRef} className="form-control" id="inputName"/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Įveskite el. paštą</label>
                                <div className="col-sm-10">
                                    <input type="email" placeholder="email@pavyzdys.com" onChange={(e) => setEmail(e.target.value)} className="form-control" id="inputEmail" value={email}/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Sukurkite slaptažodį: </label>
                                <div className="col-sm-10">
                                    <input type="password" ref={regPasswordRef} className="form-control" id="inputPassword" aria-describedby="passwordHelpBlock"/>
                                    <div id="passwordHelpBlock" className="form-text">
                                        Slaptažodį turi sudaryti 8-20 simbolių , gali būti raidės ar skaičiai. Be tarpų, specialiųjų simbolių ar emoji.
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputPasswordRepeat" className="col-sm-2 col-form-label">Pakartokite slaptažodį: </label>
                                <div className="col-sm-10">
                                    <input type="password" ref={regPasswordRepeatRef} className="form-control" id="inputPasswordRepeat" aria-describedby="passwordHelpBlock"/>
                                </div>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary">Registruotis</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showSignIn && (
                <div className='overlay' onClick={handleClose}>
                    <div className='sign-in-field' onClick={(e) => e.stopPropagation()}>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                            <label htmlFor="floatingInput">El. paštas</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                            <label htmlFor="floatingPassword">Slaptažodis</label>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Įeiti</button>
                        </div>
                    </div>
                </div>
            )}
    
            
        </div>

        
    )
}

export default HomePage