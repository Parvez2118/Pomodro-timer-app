import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './App.css';

// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: "AIzaSyDvumXdoZmWCqJhWt7j29GflJoHZi5_HfI",
  authDomain: "netflix-8cf72.firebaseapp.com",
  projectId: "netflix-8cf72",
  storageBucket: "netflix-8cf72.appspot.com",
  messagingSenderId: "1085415588999",
  appId: "1:1085415588999:web:6a16cbb4bc6ba674fe6422",
  measurementId: "G-HJR3V1DV0E"
};
firebase.initializeApp(firebaseConfig);

const App = () => {
 
  const [user, setUser] = useState(null);
  const [timer, setTimer] = useState(25 * 60); // 25 minutes in seconds
  const [breakTimer, setBreakTimer] = useState(5 * 60); // 5 minutes in seconds
  const [isBreak, setIsBreak] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          clearInterval(interval);
          setIsActive(false);
          setTimer(25 * 60); // Reset the timer to 25 minutes
          setIsBreak(true);
          startBreakTimer();
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, timer]);

  const startTimer = () => {
    setIsActive(true);
    setIsBreak(false);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimer(25 * 60);
    setBreakTimer(5 * 60);
    setIsBreak(false);
  };

  const startBreakTimer = () => {
    setIsActive(true);
  };

  return (
    <div>
      {user ? (
        <div className='main1 card1'>
          <h1 className='innerh1'>Welcome, {user.email}</h1>
          <p className='timer'>⏰ Timer: {Math.floor(timer / 60)}:{timer % 60}</p>
          {isBreak && <p>Break Timer: {Math.floor(breakTimer / 60)}:{breakTimer % 60}</p>}
          <button className='innerbutton' onClick={startTimer}>⏳ Start Timer</button>
          <button className='innerbutton1' onClick={pauseTimer}>⌛ Pause Timer</button>
          <button className='innerbutton2' onClick={resetTimer}>⏱️ Reset Timer</button>
        </div>
      ) : (
        <div className='main card'>
          <img src='https://th.bing.com/th/id/OIP.4EpZvCSiFwuhqbXsXAy28wHaFj?pid=ImgDet&w=207&h=155&c=7&dpr=1.3' ></img>
          <h1 className='innerh1'>Please Sign In To Use The Timer.</h1>
          <button className='outerbutton' onClick={() => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())}>
            Sign In with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default App;







