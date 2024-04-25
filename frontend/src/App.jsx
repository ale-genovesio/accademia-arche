import './App.css'
import Header from './components/Header/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import AreaRiservata from './pages/AreaRiservata'
import AccessoAreaRiservata from './pages/AccessoAreaRiservata'
import Footer from './components/Footer/Footer'
import ServicesList from './pages/ServicesList'
import CourseDetail from './pages/CourseDetail'
import TreatmentDetail from './pages/TreatmentDetail'
import { useState, useEffect } from 'react'
import About from './pages/About'

function App() {
  const [loggedInToken, setLoggedInToken] = useState(null)
  // faccio partire da null perche'il localstorage nel caso in cui non ci sia l'item
  // che sto cercando restituisce null, quindi non metto undefined
  const [userCourses, setUserCourses] = useState([])

  useEffect(() => {
    const loggedInToken = localStorage.getItem('loggedInToken')
    setLoggedInToken(loggedInToken)

    if (loggedInToken) {
      fetch(`http://localhost:3000/user/${loggedInToken}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((json) => {
          localStorage.setItem('userCourses', JSON.stringify(json.courses))
          setUserCourses(json.courses)
        })
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Homepage />} />
          <Route
            path="/areariservata"
            element={
              <AreaRiservata
                loggedInToken={loggedInToken}
                setLoggedInToken={setLoggedInToken}
                userCourses={userCourses}
                setUserCourses={setUserCourses}
              />
            }
          />
          <Route
            path="/accesso-areariservata/:slug"
            element={<AccessoAreaRiservata />}
          />
          <Route path="/corsi" element={<ServicesList />} />
          <Route
            path="/corsi/:slug"
            element={
              <CourseDetail
                loggedInToken={loggedInToken}
                setLoggedInToken={setLoggedInToken}
                userCourses={userCourses}
                setUserCourses={setUserCourses}
              />
            }
          />
          <Route path="/trattamenti" element={<ServicesList />} />
          <Route
            path="/trattamenti/:slug"
            element={
              <TreatmentDetail
                loggedInToken={loggedInToken}
                setLoggedInToken={setLoggedInToken}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
