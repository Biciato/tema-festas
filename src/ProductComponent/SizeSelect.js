import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';

const e = React.createElement

const Sizes = [
  'surpresa',
  'mini',
  'grande',
]

export default class SizeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(size) {
    this.props.onSizeChange(size);
  }
  render() {
    let sizeList = []
    Sizes.map((item) => sizeList.push({
      value: item,
      label: item
    }));
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
