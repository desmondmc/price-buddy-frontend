import React, { Component } from 'react';
import './Product.css';

export default class Product extends Component {
  render() {
    const { image, name, amount, currency, url } = this.props.product

    return (
      <div className="product_container">
        <img src={image} alt={name} height="100" width="100" />
        <div className="text_container">
          <a target="_blank" href={url}>
            {name}
          </a>
          <div className="bold">
            <br></br>
            {`${amount} ${currency}`}
          </div>
        </div>
      </div>
    );
  }
}
