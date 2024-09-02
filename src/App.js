// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About.js';
import Home from './components/Home.js';
import NoteState from './context/notes/noteState.js'
import Alert from './components/Alert.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import { useState } from 'react';

function App() {
  const [alertMsg, setAlertMsg] = useState(null);
  const showAlert = (Message, type) => {
    setAlertMsg({
      msg: Message,
      type: type,
    });
    setTimeout(() => {
      setAlertMsg(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alertMsg} />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert} />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login showAlert={showAlert} />} />
              <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
