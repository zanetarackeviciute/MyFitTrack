import { Outlet, NavLink } from "react-router-dom"

const MainLayout = () => {
    return (
        <div>
            <nav>
                <div>
                    <NavLink to='/'>BetterDaily</NavLink>
                </div>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/new-workout'>New workout</NavLink></li>
                    <li><NavLink to='/body-measure'>Body measure</NavLink></li>
                    <li><NavLink to='/progress'>Progress</NavLink></li>
                    <li><NavLink to='/workout-history'>History</NavLink></li>
                    <li><NavLink to='/about'>About</NavLink></li>
                </ul>
            </nav>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default MainLayout