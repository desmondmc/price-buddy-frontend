import React, { Component } from 'react';
import './App.css';
import MainMessage from './components/MainMessage';
import MainInput from './components/MainInput';
import * as API from './utils/API';
import { AppContext } from './Provider';
import { setCookie } from './utils/cookie';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
library.add(faPaperPlane)

class App extends Component {
  constructor(props) {
    super(props)

    this.mainMessage = React.createRef()

    // Reasoning about this like it's just the onboarding component
    this.state = {
      link: null,
      email: null,
      password: null,
      acceptedPrivacy: false,
      isError: false,
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
      return 'Please give us a link'
    } else  if (link && !email) {
      return 'Give us your email and we will let you know stuff'
    } else if (link && email) {
      return 'Great! Now give us your password'
    }

    return 'Hmm something is wrong';
  }

  errorMessage = () => {
    const {
      link,
      email,
    } = this.state;
    
    if (link === null) {
      return 'Oops, there is something wrong with that link'
    } else  if (link && !email) {
      return 'Oops, please enter a valid email address'
    } else if (link && email) {
      return 'Password must be longer than 4 characters'
    }

    return 'Hmm something is wrong';
  }

  submitFunction = newValue => {
    this.mainMessage.current.clear()
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
                <MainMessage ref={this.mainMessage} message={this.message()} isError={this.state.isError} />
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
