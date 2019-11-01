import React from 'react';
import {
  Products
} from '../resources/products';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';

const e = React.createElement

export default class ProductSelect extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(product) {
    this.props.onProductChange(product.value)
  }
  render() {
    const prodList = Object.assign(
      {}, 
      Products.categories[0],
      Products.categories[1],
      Products.categories[2],
      Products.categories[3]
    )
    return (
      e(Row, {
          bsPrefix: 'row m-1'
        },
        e(Col, null, [
          e('label', {
            className: 'label bg-success',
            key: 1
          }, 'Produto'),
          e(Select, {
            options: Object.keys(prodList).map((item) => ({value: item, label: item})),
            onChange: this.handleChange,
            key: 2
          })
        ])
      )
    )
  }
}
