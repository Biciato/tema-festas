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
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.state = {subtypeObj: {}};
  }
  handleQtyChange(e) {
    let subtypeObj = {};
    if (this.getProdCategory() === 2) {
      subtypeObj = {
        [e.target.attributes.data.value]: {
          qty: e.target.value,
          price: this.state.subtypeObj[e.target.attributes.data.value] &&
                 this.state.subtypeObj[e.target.attributes.data.value].price
            ? this.state.subtypeObj[e.target.attributes.data.value].price
            : parseFloat(this.getItemPrice(e.target.attributes.data.value)).toFixed(2)
        }
      }
    } else {
      subtypeObj = {
        [e.target.attributes.data.value]: {
          qty: e.target.value
        }
      }
    }    
    this.setState({subtypeObj}, () => 
      this.props.onSubtypeChange({subtype: this.state})
    );    
  }
  handlePriceChange(e) {
    const subtypeObj = {
      [e.target.attributes.data.value]: {
        qty: this.state.subtypeObj[e.target.attributes.data.value] &&
             this.state.subtypeObj[e.target.attributes.data.value].qty
        ? this.state.subtypeObj[e.target.attributes.data.value].qty
        : 0,
        price: parseFloat(e.target.value).toFixed(2)
      }
    }
    this.setState({subtypeObj}, () => 
      this.props.onSubtypeChange({subtype: this.state})
    );    
  }
  getProdCategory() {
    return [0, 1, 2, 3].find((item) => Products.categories[item][this.props.type]);
  }
  getItemPrice(item) {
    return Products.categories[2][this.props.type]
      .filter((i) => i.name === item)
      .map((i) => i.price)
      .shift();
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
      types = this.props.type === 'números' ? [...Array(10).keys()].map(x => ++x) : Types[this.props.type];
    }    
    return types.map((item, idx) => {
      return e(
        Row, {key: idx},
        e(Col, null, [
          e(Badge, {
            variant: 'info',
            key: 'b-1'
          }, item),
          e(InputGroup, {
              key: 'b-2', 
              size: 'sm', 
              className: this.getProdCategory() !== 2 ? 'd-none' : '' 
            }, [
              e(InputGroup.Prepend, {key: 'c-1'}, e(InputGroup.Text, null, 'Preço')),
              e(FormControl, {
                key: 'c-2', min: 0, 
                onChange: this.handlePriceChange, 
                data: item, 
                placeholder: this.getProdCategory() !== 2 
                          ? '' 
                          : parseFloat(this.getItemPrice(item)).toFixed(2)
              })
            ]
          ),
          e(InputGroup, {key: 'b-3', size: 'sm'}, [
            e(InputGroup.Prepend, {key: 'c-1'}, e(InputGroup.Text, null, 'Quantidade')),
            e(FormControl, {
              key: 'c-2', 
              type: 'number', 
              min: 0, 
              onChange: this.handleQtyChange, 
              data: item
            })
          ])
        ])
      )
    })
  }
}
