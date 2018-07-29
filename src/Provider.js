import React, { Component } from 'react';
import { getCookie } from './utils/cookie'

export const AppContext = React.createContext();

export default class Provider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      token: getCookie('token'),
    }
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
        setAuthToken: this.setAuthToken
      }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}