import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import './TypeList.scss';

const e = React.createElement

export default class TypeList extends React.Component {
  constructor(props) {
    super(props)
    this.handleQtyChange = this.handleQtyChange.bind(this)
    this.handleAccept = this.handleAccept.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.showModal = this.showModal.bind(this)
    this.state = {modal:false, toast: false}
  }
  handleQtyChange(e) {
    this.setState({
      [e.target.attributes.data.value]: e.target.value
    });
  }

  render() {
    if (!this.props.type) {
      return null;
    }
    return Object.keys(this.props.type).map((item, idx) => {
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
