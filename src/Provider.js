import React, { Component } from 'react';
import { getCookie } from './utils/cookie'

export const AppContext = React.createContext();

export default class Provider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      onboardingLink: null,
      email: null,
      token: getCookie('token'),
    }
  }

  setOnboardingLink = (link) => {
    this.setState({
      onboardingLink: link,
    })
  }

  setAuthToken = (token) => {
    this.setState({
      token: token,
    })
  }

  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        setAuthToken: this.setAuthToken,
        setOnboardingLink: this.setOnboardingLink,
      }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}