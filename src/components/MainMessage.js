import React, { Component } from 'react';
import TypeWriter from 'react-typewriter';

class MainMessage extends Component {
  render() {
    return (
      <div className="main_message">
         <TypeWriter typing={1}>Hello World!</TypeWriter>
      </div>
    );
  }
}

export default MainMessage;
