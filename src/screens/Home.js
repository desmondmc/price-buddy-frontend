import React, { Component } from 'react';
import { AppContext } from 'Provider';
import MainMessage from 'components/MainMessage';
import MainInput from 'components/MainInput';
import t from 'translations';
import { setCookie } from 'utils/cookie'
import 'App.css';

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.mainMessage = React.createRef()
  }

  submitFunction = (context, newValue) => {
    // TODO Implement send link
    return () => {};
  };

  onLogout = (context) => {
    setCookie('token', null, 9999)
    context.setAuthToken(null)
  }

  render() {
    return (
      <AppContext.Consumer>
        {(context) => (
          <div className="container">
            <button type="button" onClick={() => this.onLogout(context)}>{t('logout')}</button>
            <div className="price_buddy_main_container">
              <div className="row justify-content-center">
                <MainMessage
                  ref={this.mainMessage}
                  message={'You are logged in!'}
                  isError={null}
                />
              </div>
              <div className="row justify-content-center">
                <MainInput
                  placeholder={t('product_link')}
                  onSubmit={(value) => this.submitFunction(context, value)}
                  isSecureInput={false}
                  error={'Everything is broken'}
                />
              </div>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}