import './HomePage.scss'
// import logo from '../assets/MyFitTrackLogo.png'
const HomePage = () => {
    
    return (
        <div className='home-text'>
            <div className='welcome-text'>
                <h1>Sveikas atvykęs į <strong>MyFitTrack</strong>!</h1>
                <hr></hr>
                <h4>Pradėk naują treniruotę, sek savo kūno apimtis arba peržiūrėk pažangą.</h4>
            </div>
            <div className='buttons'>
                <button>Registruotis</button>
                <button>Prisijungti</button>
            </div>

            
            
        </div>

        
    )
}

export default HomePage