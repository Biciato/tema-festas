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
          bsPrefix: 'row m-1' + (this.props.display ? ' d-none' : '')
        },
        e(Col, null, 
          e('h5', {className: "text-left mt-3", key: 1}, 'Novo Pedido'),
          e(Select, {
            options: Object.keys(prodList).map((item) => ({value: item, label: item})),
            onChange: this.handleChange,
            defaultValue: {value:'Produto', label:'Produto'},
            key: 2
          })
        )
      )
    )
  }
}
