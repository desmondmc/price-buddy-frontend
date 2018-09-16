import React, { Component } from 'react';
import './App.css';
import MainMessage from './components/MainMessage';
import MainInput from './components/MainInput';
import t from './translations';
import MainPrivacy from './components/MainPrivacy';
import * as API from './utils/API';
import { AppContext } from './Provider';
import { setCookie } from './utils/cookie'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
library.add(faPaperPlane)

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

  signup = async (context) => {
    const { auth_token } = await API.signup({
      email: this.state.email,
      password: this.state.password,
    });

    if (!auth_token) {
      this.setState({ errorMessage: t('try_again') });
      return;
    }

    if (auth_token) {
      setCookie('token', auth_token, 10)
      context.setAuthToken(auth_token)
    }
  }

  message = () => {
    const flowStateMessageMap = {
      GET_LINK: t('ask_link'),
      GET_EMAIL: t('ask_email'),
      GET_PASSWORD: t('ask_password'),
      GET_PRIVACY_POLICY: t('ask_privacy'),
      UNKNOWN_ERROR: t('unknown_error')
    }

    return flowStateMessageMap[this.getFlowPosition()];
  }

  placeholder = () => {
    const flowStateMessageMap = {
      GET_LINK: t('product_link'),
      GET_EMAIL: t('placeholder_email'),
      GET_PASSWORD: t('password'),
      UNKNOWN_ERROR: '',
    }

    return flowStateMessageMap[this.getFlowPosition()];
  }

  submitFunction = (context, newValue) => {
    this.mainMessage.current.clear()

    const flowStateMessageMap = {
      GET_LINK: () => this.setState({ link: newValue }),
      GET_EMAIL: () => this.validateAndSetEmail(newValue),
      GET_PASSWORD: () => this.validatePassword(newValue, context),
      GET_PRIVACY_POLICY: () => this.signup(context),
      UNKNOWN_ERROR: () => { },
    }

    return flowStateMessageMap[this.getFlowPosition()]();

  };

  validateAndSetEmail = async (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailRegex.test(email)) {
      const { is_available } = await API.emailAvailable(email);

      if (!is_available) {
        this.setState({ errorMessage: t('email_already_exists') });
        return;
      }

      this.setState({ email, errorMessage: null })
    } else {
      this.setState({ errorMessage: t('ask_valid_email') })
    }
  }

  validatePassword = (password, context) => {
    if (password.length < 6) {
      this.setState({ errorMessage: t('password_too_short') })
    } else {
      this.setState({ password: password, errorMessage: null })
    }
  }

  getFlowPosition = () => {
    const {
      link,
      email,
      password,
      acceptedPrivacy,
    } = this.state;

    if (link === null) {
      return 'GET_LINK'
    } else if (link && !email) {
      return 'GET_EMAIL'
    } else if (link && email && !password) {
      return 'GET_PASSWORD'
    } else if (link && email && password && !acceptedPrivacy) {
      return 'GET_PRIVACY_POLICY'
    }

    return 'UNKNOWN_ERROR';
  }

  render() {
    const message = this.state.errorMessage || this.message();
    const isSecureInput = this.getFlowPosition() === 'GET_PASSWORD';
    const showPrivacy = this.getFlowPosition() === 'GET_PRIVACY_POLICY';

    return (
      <AppContext.Consumer>
        {(context) => (
          <div className="container">
            <div className="price_buddy_main_container">
              <div className="row justify-content-center">
                <MainMessage
                  ref={this.mainMessage}
                  message={context.state.token ? 'Success!' : message}
                  isError={!!this.state.errorMessage}
                />
              </div>
              <div className="row justify-content-center">
                {
                  !showPrivacy &&
                  <MainInput
                    placeholder={this.placeholder()}
                    onSubmit={(value) => this.submitFunction(context, value)}
                    isSecureInput={isSecureInput}
                    error={'Everything is broken'}
                  />
                }
              </div>
              <div className="row justify-content-center">
                {this.getFlowPosition() == 'GET_PRIVACY_POLICY' && <MainPrivacy onAccept={() => this.submitFunction(context)}/>}
              </div>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default App;
