import React from 'react';
import NavBar from './components/NavBar';
import TinyUrlForm from './components/TinyUrlForm.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <TinyUrlForm />
    </div>
  );
}

export default App;
