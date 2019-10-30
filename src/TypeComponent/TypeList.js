import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {
  Types
} from '../resources/types'
import { Products } from '../resources/products'
import './TypeList.scss';

const e = React.createElement

export default class TypeList extends React.Component {
  constructor(props) {
    super(props)
    this.handleQtyChange = this.handleQtyChange.bind(this)
  }
  handleQtyChange(e) {
    this.setState({
      [e.target.attributes.data.value]: e.target.value
    }, () => this.props.onSubtypeChange({subtype: this.state}));    
  }
  getProdCategory() {
    return [0, 1, 2, 3].filter((item) => Products.categories[item][this.props.prodName])[0];
  }

  render() {
    let types = [];
    if (!this.props.type) {
      return null;
    } else if (this.props.type === 'etiquetas') {
      types = Products.categories[3].etiquetas.names;
    } else if (!Types.hasOwnProperty(this.props.type) && this.props.type !== 'número') {
      types = Products.categories[2][this.props.type].map((item) => item.name)
    } else {
      types = this.props.type === 'número' ? [...Array(10).keys()].map(x => ++x) : Types[this.props.type];
    }    
    return types.map((item, idx) => {
      return e(
        Row, {key: idx},
        e(Col, null, [
          e(Badge, {
            variant: 'info',
            key: 'b-1'
          }, item),
          e(InputGroup, {key: 'b-2', size: 'sm'}, [
            e(InputGroup.Prepend, {key: 'c-1'}, e(InputGroup.Text, null, 'Quantidade')),
            e(FormControl, {key: 'c-2', type: 'number', min: 0, onChange: this.handleQtyChange, data: item})
          ])
        ])
      )
    })
  }
}
