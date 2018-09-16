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

    this.mainMessage = React.createRef()

    this.state = {
      link: null,
      email: null,
      password: null,
      acceptedPrivacy: false,
      errorMessage: null,
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
    const flowStateMessageMap = {
      GET_LINK: 'Please give us a link',
      GET_EMAIL: 'Give us your email and we will let you know stuff',
      GET_PASSWORD: 'Great! Now give us your password',
      UNKNOWN_ERROR: 'Hmm something is wrong'
    }

    return flowStateMessageMap[this.getFlowPosition()];
  }

  submitFunction = newValue => {
    this.mainMessage.current.clear()

    const flowStateMessageMap = {
      GET_LINK: () => this.setState({ link: newValue }),
      GET_EMAIL: () => this.validateAndSetEmail(newValue),
      GET_PASSWORD: () => this.validateAndSetPassword(newValue),
      UNKNOWN_ERROR: () => {},
    }

    return flowStateMessageMap[this.getFlowPosition()]();

  };

  validateAndSetEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(email)) {
      this.setState({ email, errorMessage: null })
    } else {
      this.setState({ errorMessage: 'Oops, please enter a valid email address' })
    }
  }

  validateAndSetPassword = (password) => {
    if (password.length < 8) {
      this.setState({ errorMessage: 'Password must be at least 8 charaters' })
    } else {
      this.setState({ password: password, errorMessage: null })
    }
  }

  getFlowPosition = () => {
    const {
      link,
      email,
      errorMessage,
    } = this.state;

    if (link === null) {
      return 'GET_LINK'
    } else if (link && !email) {
      return 'GET_EMAIL'
    } else if (link && email) {
      return 'GET_PASSWORD'
    }

    return 'UNKNOWN_ERROR';
  }

  render() {
    return (
      <AppContext.Consumer>
        {(context) => (
          <div className="container">
            <div className="price_buddy_main_container">
              <div className="row justify-content-center">
                <MainMessage
                  ref={this.mainMessage}
                  message={this.state.errorMessage || this.message()}
                  isError={!!this.state.errorMessage}  
                />
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
