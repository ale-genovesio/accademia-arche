import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
