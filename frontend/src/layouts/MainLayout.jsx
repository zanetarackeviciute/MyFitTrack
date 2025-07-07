import { Outlet, NavLink } from "react-router-dom"
import './MainLayout.scss'
import logo from '../assets/MyFitTrackLogo.png'

const MainLayout = () => {
    return (
        <div className="main-page">
            <nav className="navbar bg-dark">
                <div className= "container">
                    <div className="logo">
                        <NavLink to='/' className="navbar-brand"><img src={logo} alt="logo" className="logoImg"/></NavLink>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-label="Expand Navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="nav">
                        <ul className="navbar-nav">
                            <li className="nav-item active" aria-current="page"><NavLink to='/'>Pradžia</NavLink></li>
                            <li className="nav-item"><NavLink to='/macros'>Makroelementai</NavLink></li>
                            <li className="nav-item"><NavLink to='/new-workout'>Nauja treniruotė</NavLink></li>
                            <li className="nav-item"><NavLink to='/body-measure'>Matmenys</NavLink></li>
                            <li className="nav-item"><NavLink to='/progress'>Mano progresas</NavLink></li>
                            <li className="nav-item"><NavLink to='/workout-history'>Treniruočių istorija</NavLink></li>
                            <li className="nav-item"><NavLink to='/about'>Apie MyFitTrack</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="main-structure">
                <div className="container">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default MainLayout