import React, { Component } from 'react';
import './Product.css';

export default class Product extends Component {
  render() {
    const { image, name } = this.props.product

    return (
      <div className="product_container">
        <img src={image} alt="Something" height="100" width="100" />
        {name}
      </div>
    );
  }
}
