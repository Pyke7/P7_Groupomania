import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './styles/main.css';
import axios from 'axios';

function App() {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element = {<Login />} />
        <Route path='/signup' element = {<Signup />} />
        <Route path='/' element = {<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
