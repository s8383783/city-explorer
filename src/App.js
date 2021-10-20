
import './App.css';
import Forms from './Forms.js';
import React from 'react';
import Header from './Header';
import Weather from './Weather';
import Movies from './Movies'

class App extends React.Component {
  render() {
    return (
      <div id ="form3">
      <Forms />
      <Header />
      <Weather />
      <Movies />
      </div>
    )
  }
}
  
  

export default App;
