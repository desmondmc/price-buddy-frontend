import React, { Component } from 'react';
import './Product.css';

export default class Product extends Component {
  render() {
    const { image, name, amount, currency, url } = this.props.product

    return (
      <a target="_blank" href={url}>
      <div className="main_product_container">
        <img src={image ? image : 'http://www.bnwt.webplusshop.com/stores/store_16429/media/DEFAULTPRODIMAGE-4.jpg'} alt={name} height="100" width="100" />
        <div className="text_container">
            {name}
          <div className="bold">
            <br></br>
            {`${amount} ${currency}`}
          </div>
        </div>
      </div>
      </a>
    );
  }
}
