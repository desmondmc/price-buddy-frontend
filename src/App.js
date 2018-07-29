import React, { Component } from 'react';
import './App.css';
import MainMessage from './components/MainMessage';
import MainInput from './components/MainInput';

class App extends Component {
  onSubmit() {
    console.log('Submitted');
  }

  render() {
    return (
      <div class="container">
        <div class="row justify-content-center">
          <MainMessage/>
        </div>
        <div class="row justify-content-center">
          <MainInput onSubmit={this.onSubmit} error={null} />
        </div>
        <div class="row justify-content-center"></div>
        <div class="row justify-content-center"></div>
      </div>
    );
  }
}

export default App;
