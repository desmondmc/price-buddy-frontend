import React, { Component } from 'react';
import { getCookie } from './utils/cookie'

export const AppContext = React.createContext();

export default class Provider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      initialLink: null,
      email: null,
      token: getCookie('token'),
    }
  }

  setInitialLink = (link) => {
    this.setState({
      initialLink: link,
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
        setInitialLink: this.setInitialLink,
      }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}