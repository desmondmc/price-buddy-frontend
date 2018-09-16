import React, { Component } from 'react';
import './App.css';
import MainMessage from './components/MainMessage';
import MainInput from './components/MainInput';
import * as API from './utils/API';
import { AppContext } from './Provider';
import { setCookie } from './utils/cookie';

class App extends Component {
  constructor(props) {
    super(props)

    // Reasoning about this like it's just the onboarding component
    this.state = {
      link: null,
      email: null,
      password: null,
      acceptedPrivacy: false,
    }
  }

  login = async context => {
    const token = await API.login({
      email: 'desmond@asd.asd',
      password: 'asdasd',
    });

    setCookie('token', token, 10)
    context.setAuthToken(token)
  }

  message = () => {
    const {
      link,
      email,
    } = this.state;
    
    if (link === null) {
      return 'Please give us a link';
    } else  if (link && !email) {
      return 'Give us your email and we will let you know stuff';
    } else if (link && email) {
      return 'Great! Now give us your password';
    }

    return 'Hmm something is wrong';
  }

  submitFunction = newValue => {
    const {
      link,
      email,
    } = this.state

    if (link === null) {
      this.setState({ link: newValue })
    } else  if (link && !email) {
      this.setState({ email: newValue })
    } else if (link && email) {
      this.setState({ password: newValue })
    }
  };

  render() {
    return (
      <AppContext.Consumer>
        {(context) => (
          <div className="container">
            <div className="price_buddy_main_container">
              <div className="row justify-content-center">
                <MainMessage message={this.message()} isError={true} />
              </div>
              <div className="row justify-content-center">
                <MainInput onSubmit={this.submitFunction} error={'Everything is broken'} />
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
