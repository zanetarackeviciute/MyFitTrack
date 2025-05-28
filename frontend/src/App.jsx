import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import ProgressPage from './pages/ProgressPage'
import NewWorkoutPage from './pages/NewWorkoutPage'
import BodyMeasurePage from './pages/BodyMeasurePage'
import WorkoutHistoryPage from './pages/WorkoutHistoryPage'
import AboutPage from './pages/AboutPage'
import MacrosPage from './pages/MacrosPage'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MainLayout/>}>
                        <Route path='/' element={<HomePage/>} />
                        <Route path='/macros' element={<MacrosPage/>}/>
                        <Route path='/progress' element={<ProgressPage/>} />
                        <Route path='/new-workout' element={<NewWorkoutPage/>} />
                        <Route path='/body-measure' element={<BodyMeasurePage/>} />
                        <Route path='/workout-history' element={<WorkoutHistoryPage/>} />
                        <Route path='/about' element={<AboutPage/>} />
                    </Route>

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
