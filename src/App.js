
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuestHomePage from './containers/GuestHompPage';
import Dashboard from './containers/Dashboard';
import SignUp from './containers/SignUp';
import Login from './containers/Login';
import Matches from './containers/Matches';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GuestHomePage />}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/matches' element={<Matches />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
