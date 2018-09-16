import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class MainInput extends Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
  }

  onSubmit = () => {
    this.props.onSubmit(this.textInput.current.value);
    this.textInput.current.value = '';
  }

  onKeyPressEnter = (event) => {
    if(event.key == 'Enter'){
      console.log('enter press here! ')
      this.onSubmit();
    }
  }

  render() {
    return (
      <div className="input-group main_input">
        <input
          type="text"
          className="form-control"
          placeholder="Search for..."
          id="main-input"
          aria-label="Search for..."
          ref={this.textInput}
          onKeyPress={this.onKeyPressEnter}
        />
        <span className="input-group-btn">
          <button className="btn btn-secondary main_input_submit" type="button" onClick={this.onSubmit}><FontAwesomeIcon icon="paper-plane" /></button>
        </span>

      </div>
    );
  }
}

export default MainInput;
