
import './App.css';
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import GuestHomePage from './containers/GuestHompPage';
import Dashboard from './containers/Dashboard';
import SignUp from './containers/SignUp';
import Login from './containers/Login';
import Matches from './containers/Matches';
import ProtectedRoute from './Routes/ProtectedRoute';
import AuthRoute from './Routes/AuthRoutes';
import Profile from './containers/Profile';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GuestHomePage />}/>
        <Route path='/signup' element={<SignUp />} />
        <Route path="*" element={<h1>Route Not Found</h1>} />
        

        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/matches' element={<Matches />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Route>

        <Route element={<AuthRoute />}>
          <Route path='/login' element={<Login />} />
        </Route>






      </Routes>
    </BrowserRouter>
  );
}

export default App;
