import React, { Component } from 'react';
import { AppContext } from '../Provider'

class MainInput extends Component {
  render() {
    return (
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search for..." id="main-input" aria-label="Search for..." />
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="button" onClick={this.props.onSubmit}>Go!</button>
            </span>
          </div>
    );
  }
}

export default MainInput;
