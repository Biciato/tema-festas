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
    this.props.onProductChange(product)
  }
  render() {
    const prodList = Products.map((item) => ({
      value: item,
      label: item
    }))
    return (
      e(Row, {
          bsPrefix: 'row m-1'
        },
        e(Col, null,
          [
            e('label', {
              className: 'label bg-success',
              key: 1
            }, 'Produto'),
            e(Select, {
              options: prodList,
              onChange: this.handleChange,
              key: 2
            })
          ]
        )))
  }
}
