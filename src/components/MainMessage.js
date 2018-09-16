import React, { Component } from 'react';
import TypeWriter from 'react-typewriter';

class MainMessage extends Component {
  constructor(props) {
    super(props)
    this.typeWriter = React.createRef()
  }

  clear = () => {
    this.typeWriter.current.reset();
  }

  render() {
    return (
      <div className={this.props.isError ? "main_message error_message" : "main_message"}>
        <TypeWriter typing={1} ref={this.typeWriter}>{this.props.message}</TypeWriter>
      </div>
    );
  }
}

export default MainMessage;
