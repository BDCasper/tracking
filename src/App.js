import './App.css';
import Geoposition from "./pages/geoposition/geoposition"
import Header from './components/header/header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className='App-dark'>
        <Header/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Geoposition />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
export const backend = "https://script.google.com/macros/s/AKfycbwiqIjdO9VXsD_new4mpzRAEpXCWHzbjsfnHIY0Do6jFm6lUJ3FDlVOqpcZ1XoctkgE/exec"
