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

  messageFromContext = context => {
    const {
      initialLink,
      email,
    } = context.state;
    
    if (initialLink === null) {
      return 'Please give us a link';
    } else  if (initialLink && !email) {
      return 'Give us your email and we will let you know stuff';
    }

    return 'Hmm something is wrong';
  }

  render() {
    return (
      <AppContext.Consumer>
        {(context) => (
          <div className="container">
            <div className="price_buddy_main_container">
              <div className="row justify-content-center">
                {context.email !== null && <MainMessage message={this.messageFromContext(context)} />}
              </div>
              <div className="row justify-content-center">
                <MainInput onSubmit={() => context.setInitialLink('something')} error={'Everything is broken'} />
              </div>
              <div className="row justify-content-center"></div>
              <div className="row justify-content-center"></div>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default App;
