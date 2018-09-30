import React, { Component } from 'react';
import { AppContext } from 'Provider';
import MainMessage from 'components/MainMessage';
import MainInput from 'components/MainInput';
import Product from 'components/Product';
import t from 'translations';
import { setCookie } from 'utils/cookie'
import * as API from 'utils/API';
import 'App.css';

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.mainMessage = React.createRef()

    this.getProducts();

    this.state = {
      products: [],
    }
  }

  submitFunction = async (link) => {
    try {
      await API.postLink(link)
      this.getProducts();
    } catch (_) {
      console.log('Something did not work')
    }
  };

  getProducts = async () => {
    const products = await API.getUserProducts()
    this.setState({ products })
  }

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
                  message={`You are logged in! You're tracking ${this.state.products.length} product(s)`}
                  isError={null}
                />
              </div>
              <div className="row justify-content-center">
                <MainInput
                  placeholder={t('product_link')}
                  onSubmit={(value) => this.submitFunction(value)}
                  isSecureInput={false}
                  error={'Everything is broken'}
                />
              </div>
              {this.state.products.map(p => <Product product={p} />)}
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}