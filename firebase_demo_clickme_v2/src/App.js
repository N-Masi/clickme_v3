import './App.css';
import React from 'react';

import Canvas from './components/Canvas.js'

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const App = () => {

  return (
    <React.Fragment> 
      <h2>
        Welcome to ClickMe!
      </h2>
      <br/><br/><br/>
      <Canvas/>
      <h3 id="predictionText0"/>
      <h3 id="predictionText1"/>
      <h3 id="predictionText2"/>
    </React.Fragment>
  )
}

export default App;