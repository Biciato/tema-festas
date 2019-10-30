import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import { Products } from '../resources/products'

const e = React.createElement

export default class SizeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(size) {
    this.props.onSizeChange(size, this.props.product);
  }
  getProdCategory() {
    return [0, 1, 2, 3].filter((item) => Products.categories[item][this.props.product]);
  }
  prodHasSize(category) {
    return Products.categories[category][this.props.product].size ? true : false;
  }
  render() {
    const sizeList = this.prodHasSize(this.getProdCategory())
      ? Products.categories[this.getProdCategory()][this.props.product].size
        .map((item => ({
          value: item.name,
          label: item.name
        })))
      : [{
        value: 'único',
        label: 'único'
      }]
    return (
      e(Row, {
        bsPrefix: 'row m-1'
      },
        e(Col, null,
          [
            e('label', {
              className: 'label bg-info',
              key: 1
            }, 'Tamanho'),
            e(Select, {
              options: sizeList,
              onChange: this.handleChange,
              key: 2
            })
          ]
        )))
  }
}
