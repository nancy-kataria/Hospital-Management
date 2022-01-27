import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Login from './Components/Login';
import Portal from './Components/Portal';
import Staff from './Components/Staff';
import Admin from './Components/Admin';
import Doctor from './Components/Doctor';

function App() {
  return (
    <div className="App">
      <Router>
       <Header />
        <Routes>
          <Route path='/' element={<LogIn />} />
          <Route path='/portal' element={<Portal />} />
          <Route path='/staff' element={<Staff />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/doctor' element={<Doctor />} />
        </Routes>
      </Router>
    </div>
  );
}

const LogIn = () =>{
  return <Login />
}

export default App;
