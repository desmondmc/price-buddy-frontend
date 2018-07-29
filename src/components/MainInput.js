import React, { Component } from 'react';

class MainInput extends Component {
  render() {
    return (
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Search for..." id="main-input" aria-label="Search for..." />
        <span class="input-group-btn">
          <button class="btn btn-secondary" type="button" onClick={this.props.onSubmit}>Go!</button>
        </span>
      </div>
    );
  }
}

export default MainInput;