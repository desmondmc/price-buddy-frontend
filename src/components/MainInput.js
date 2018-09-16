import React, { Component } from 'react';
import { AppContext } from '../Provider'

class MainInput extends Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
  }

  onSubmit = () => {
    this.props.onSubmit(this.textInput.current.value);
    this.textInput.current.value = '';
  }

  render() {
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search for..."
          id="main-input"
          aria-label="Search for..."
          ref={this.textInput}
        />
        <span className="input-group-btn">
          <button className="btn btn-secondary" type="button" onClick={this.onSubmit}>Go!</button>
        </span>
      </div>
    );
  }
}

export default MainInput;
