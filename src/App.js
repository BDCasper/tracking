import './App.css';
import Index from "./pages/calculator/index";
import Geoposition from './pages/geoposition/geoposition';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/calculator" element={<Index />}/>
          <Route path="/geoposition" element={<Geoposition />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
export const backend = "http://192.168.152.253:10000"
