import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AreaRiservata from "./pages/AreaRiservata";
import AccessoAreaRiservata from "./pages/AccessoAreaRiservata";
import Footer from "./components/Footer/Footer";
import ServicesList from "./pages/ServicesList";
import CourseDetail from "./pages/CourseDetail";
import TreatmentDetail from "./pages/TreatmentDetail";
import { useState, useEffect } from "react";




function App() {
  const [loggedInToken, setLoggedInToken] = useState(null)
  const [userCourses, setUserCourses] = useState([])

  useEffect(() => {
    const loggedInToken = localStorage.getItem("loggedInToken");
    const courses = localStorage.getItem("userCourses");
    setLoggedInToken(loggedInToken)
    setUserCourses(JSON.parse(courses))
  }, [])
  

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="/areariservata" element={<AreaRiservata loggedInToken={loggedInToken} setLoggedInToken={setLoggedInToken} userCourses={userCourses} setUserCourses={setUserCourses}/>}/>
            <Route path="/accesso-areariservata" element={<AccessoAreaRiservata />} />
            <Route path="/corsi" element={<ServicesList />}/>
            <Route path="/corsi/:slug" element={<CourseDetail loggedInToken={loggedInToken} setLoggedInToken={setLoggedInToken} userCourses={userCourses} setUserCourses={setUserCourses}/>} />
            <Route path="/trattamenti" element={<ServicesList />}/>
            <Route path="/trattamenti/:slug" element={<TreatmentDetail loggedInToken={loggedInToken} setLoggedInToken={setLoggedInToken}/>} />
          </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
