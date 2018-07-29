import React, { Component } from 'react';
import './App.css';
import MainMessage from './components/MainMessage';
import MainInput from './components/MainInput';
import * as API from './utils/API';
import { AppContext } from './Provider';
import { setCookie } from './utils/cookie';

class App extends Component {
  login = async context => {
    const token = await API.login({
      email: 'desmond@asd.asd',
      password: 'asdasd',
    });

    setCookie('token', token, 10)
    context.setAuthToken(token)
  }

  render() {
    return (
      <AppContext.Consumer>
        {(context) => (
          <div className="container">
            <div className="row justify-content-center">
              <MainMessage />
            </div>
            <div className="row justify-content-center">
              <MainInput onSubmit={() => this.login(context)} error={'Everything is broken'} />
            </div>
            <div className="row justify-content-center"></div>
            <div className="row justify-content-center"></div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default App;
