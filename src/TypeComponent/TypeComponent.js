import React from 'react';
import TypeSelect from './TypeSelect';
import TypeList from './TypeList';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Products } from '../resources/products'

const e = React.createElement

export default class TypeComponent extends React.Component {
  constructor(props) {
    super(props)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleSubtypeChange = this.handleSubtypeChange.bind(this)
    this.showModal = this.showModal.bind(this)
    this.handleAccept = this.handleAccept.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = {type:'', modal: false, toast: false}
  }

  handleTypeChange(type) {
    this.setState({type: type.value})
  }
  handleSubtypeChange(subtype) {
    this.setState(subtype)
  }
  handleAccept() {
    this.props.onSubtypeSet(this.state.subtype)
    this.setState({modal: false})
    this.setState({toast: true})
  }
  showModal() {
    this.setState({modal: true})
  }
  handleClose() {
    this.setState({modal: false})
    this.setState({toast: false})
  }
  getProdCategory() {
    return [0, 1, 2, 3].filter((item) => Products.categories[item][this.props.prodName])[0];
  }
  getProdPrice() {
    let price;
    switch(this.getProdCategory()) {
      case 0:
        price = Products[0][this.props.prodName].size
          .filter((item) => item.name === this.props.size) 
          break;
      case 1:
        price = Products[1][this.props.prodName].price  
        break;
      case 2:
        price = null;
        break;
      default:
        price = 0.00;
    }
    return price;
  }

  render() {
    return (
      e(Row, { bsPrefix: 'row m-1' },
        e(Col, null, [
          e('label', {
            className: 'label bg-danger',
            key: 1
          }, 'Subtipo'),
          e(TypeSelect,{
            onTypeChange: this.handleTypeChange, 
            key: 2,
            prodName: this.props.prodName
          }),
          e(InputGroup, {key: 3 , className: this.state.typeArr === null ? 'd-none' : ''}, [
            e(InputGroup.Prepend, {key: 'i-1'}, 
              e(InputGroup.Text, null, 'R$')),
            e(FormControl, {key: 'i-2', value: this.getProdPrice()}),
            e(InputGroup.Append, {key: 'i-3'}, 
              e(InputGroup.Text, null, '.00'))
          ]),
          e(TypeList, {
            type: this.state.type === 'Não Possui' ? this.props.prodName : this.state.type,
            key: 4,
            style: {borderBottom: 'none'},
            onSubtypeChange: this.handleSubtypeChange
          }),
          e(Button, {
            style: {
              display: this.state.type === '' ? 'none' : ''
            }, 
            key: 5, 
            onClick: this.showModal
          }, 'Incluir'),
          e(Modal, {show: this.state.modal, onHide: this.handleClose, key: 6}, [
            e(Modal.Header, {closeButton: true, key: 'm-1'}, 
              e(Modal.Title, null, 'Confirmação de inclusão')),
            e(Modal.Body, {key: 'm-2'}, 'Tem certeza que deseja incluir esses itens ?'),
            e(Modal.Footer, {key: 'm-3'}, [
              e(Button, {variant: 'danger', onClick: this.handleClose, key: 'mb-1'}, 'Cancelar'),
              e(Button, {variant: 'success', onClick: this.handleAccept, key: 'mb-2'}, 'Aceitar')
            ])
          ]),
          e(Toast, {
            show: this.state.toast, 
            delay: 3000, 
            autohide: true, 
            onClose: this.handleClose, 
            key: 7 
          }, e(Toast.Body, null, 'Itens incluso com sucesso !!!'))
        ])
      )
    )
  }
}
