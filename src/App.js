
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuestHomePage from './containers/GuestHompPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GuestHomePage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
