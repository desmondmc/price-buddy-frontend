import React, { Component } from 'react';
import { AppContext } from '../Provider'

class MainInput extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search for..." id="main-input" aria-label="Search for..." />
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="button" onClick={this.props.onSubmit}>Go!</button>
            </span>
            {context.state.token ? <div>I am logged in</div> : <div>I am not logged in</div>}
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default MainInput;
