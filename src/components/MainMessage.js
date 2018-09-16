import React, { Component } from 'react';
import TypeWriter from 'react-typewriter';

class MainMessage extends Component {
  render() {
    return (
      <div className={this.props.isError ? "main_message error_message" : "main_message"}>
         <TypeWriter typing={1}>{this.props.message}</TypeWriter>
      </div>
    );
  }
}

export default MainMessage;
