import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Description from "./components/Description/Description";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar/>
      <Description/>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
