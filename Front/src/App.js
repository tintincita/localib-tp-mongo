import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import './App.css';
import Listing from './components/listing'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Listing list="CONFIG.api.clients"/>
      </div>
    );
  }
}
 
export default App;