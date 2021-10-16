
import './App.css';
import Forms from './Forms.js';
import React from 'react';
import Header from './Header';
import Weather from './Weather';

class App extends React.Component {
  render() {
    return (
      <div id ="form3">
      <Forms />
      <Header />
      <Weather />
      </div>
    )
  }
}
  
  

export default App;
