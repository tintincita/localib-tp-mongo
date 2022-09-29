import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CONFIG from './config/config.json'

import './App.css';
import Listing from './components/listing'


const App = () => {
  const apiUrl = CONFIG.api;
  return(
    <div className="App">
      <Listing list={apiUrl.clients}/>
      <Listing list={apiUrl.locations}/>
      <Listing list={apiUrl.vehicules}/>
    </div>
  )
}

export default App;