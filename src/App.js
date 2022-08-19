import React from 'react';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <Routes />
    </div>
  );
}

export default App;
