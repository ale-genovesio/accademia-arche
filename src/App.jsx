import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AreaRiservata from "./pages/AreaRiservata";
import AccessoAreaRiservata from "./pages/AccessoAreaRiservata";
import Footer from "./components/Footer/Footer";



function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/areariservata" element={<AreaRiservata />} />
          <Route path="/accesso-areariservata" element={<AccessoAreaRiservata />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
