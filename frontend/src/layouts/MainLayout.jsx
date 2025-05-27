import { Outlet, NavLink } from "react-router-dom"
import './MainLayout.scss'
import logo from '../assets/MyFitTrackLogo.png'

const MainLayout = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-xl bg-dark">
                <div className= "container">
                    <div className="logo">
                        <NavLink to='/' className="navbar-brand"><img src={logo} alt="logo" className="logoImg"/></NavLink>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item active" aria-current="page"><NavLink to='/'>Home</NavLink></li>
                            <li className="nav-item"><NavLink to='/new-workout'>New workout</NavLink></li>
                            <li className="nav-item"><NavLink to='/body-measure'>Body measure</NavLink></li>
                            <li className="nav-item"><NavLink to='/progress'>Progress</NavLink></li>
                            <li className="nav-item"><NavLink to='/workout-history'>History</NavLink></li>
                            <li className="nav-item"><NavLink to='/about'>About</NavLink></li>
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