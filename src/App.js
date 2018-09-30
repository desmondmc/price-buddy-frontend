import React, { Component } from 'react';
import { AppContext } from 'Provider';
import Onboarding from 'screens/Onboarding';
import Home from 'screens/Home';

class App extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {(context) => (
          context.state.token
          ? <Home />
          : <Onboarding />
        )}
      </AppContext.Consumer>
    );
  }
}

export default App;
