import { useRef, useState } from 'react'
import './HomePage.scss'
// import logo from '../assets/MyFitTrackLogo.png'
const HomePage = () => {
    const regPasswordRef = useRef()
    const regEmailRef = useRef()

    const [showRegForm, setShowRegForm] = useState(false)
    const [showSignIn, setShowSignIn] = useState(false)
    const handleRegister = () => {
        setShowRegForm(true)
        setShowSignIn(false)
    }

    const handleSignIn = () => {
        setShowSignIn(true)
        setShowRegForm(false)
    }

    return (
        <div className='home-text'>
            <div className='welcome-text'>
                <h1>Sveikas atvykęs į <strong>MyFitTrack</strong>!</h1>
                <hr></hr>
                <h4>Pradėk naują treniruotę, sek savo kūno apimtis arba peržiūrėk pažangą.</h4>
            </div>
            <div className='buttons'>
                <button onClick={handleRegister}>Registruotis</button>
                <button onClick={handleSignIn}>Prisijungti</button>
            </div>
            { showRegForm && (
                <div className='registration'>
                    <form action="onSubmit">
                        <div class="mb-3 row">
                            <label for="staticEmail" class="col-sm-2 col-form-label">Įveskite el. paštą</label>
                            <div class="col-sm-10">
                                <input type="text" ref={regEmailRef} readonly class="form-control-plaintext" id="staticEmail" value="email@pavyzdys.com"/>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Sukurkite slaptažodį: </label>
                            <div class="col-sm-10">
                                <input type="password" ref={regPasswordRef} class="form-control" id="inputPassword" aria-describedby="passwordHelpBlock"/>
                                <div id="passwordHelpBlock" class="form-text">
                                    Slaptažodį turi sudaryti 8-20 simbolių , gali būti raidės ar skaičiai. Be tarpų, specialiųjų simbolių ar emoji.
                                </div>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Pakartokite slaptažodį: </label>
                            <div class="col-sm-10">
                                <input type="password" ref={regPasswordRef} class="form-control" id="inputPassword" aria-describedby="passwordHelpBlock"/>
                            </div>
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary">Registruotis</button>
                        </div>
                    </form>
                </div>
            )}

            {showSignIn && (
                <div className='sign-in-field'>
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                        <label for="floatingInput">El. paštas</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                        <label for="floatingPassword">Slaptažodis</label>
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">Įeiti</button>
                    </div>
                </div>
            )}
    
            
        </div>

        
    )
}

export default HomePage