import React, { Component } from 'react';
import './App.css';

class App extends Component {
  submitLink() {
    console.log('called!')
  }

  render() {
    return (
      <div class="container">
        <div class="row justify-content-center"></div>
        <div class="row justify-content-center">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search for..." id="main-input" aria-label="Search for..." />
            <span class="input-group-btn">
              <button class="btn btn-secondary" type="button" onClick={this.submitLink}>Go!</button>
            </span>
          </div>
        </div>
        <div class="row justify-content-center"></div>
        <div class="row justify-content-center"></div>
      </div>
    );
  }
}

export default App;
