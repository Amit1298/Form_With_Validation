// import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Details from './Details/Details';
import Form from './Login/Form';
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/details" element={<Details />} />
      </Routes>
      </BrowserRouter>
        
      
    </div>
  );
}

export default App;
