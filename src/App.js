import './App.css';
import Index from "./pages/calculator/index";
import Geoposition from "./pages/geoposition/geoposition"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}/>
          <Route path="/tracking" element={<Geoposition />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
export const backend = "https://script.google.com/macros/s/AKfycbwiqIjdO9VXsD_new4mpzRAEpXCWHzbjsfnHIY0Do6jFm6lUJ3FDlVOqpcZ1XoctkgE/exec"
