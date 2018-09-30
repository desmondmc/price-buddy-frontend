import React, { Component } from 'react';
import '../App.css';

export default class Home extends Component {
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
}