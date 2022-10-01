import React from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Routes from './routes/index.routes'

import NavBar from './components/navbar'


const App = () => {
  return(
    <div className="App">
      <NavBar />
      <Routes />
    </div>
  )
}

export default App;