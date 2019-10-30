import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {
  Types
} from '../resources/types'

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

  render() {
    if (!this.props.type) {
      return null;
    }
    const types = this.props.type === 'number' ? [...Array(10).keys()].map(x => ++x) : Types[this.props.type];
    return types.map((item) => {
      return e(
        Row, null,
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
