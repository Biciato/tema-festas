import React from 'react';
import TypeSelect from './TypeSelect';
import TypeList from './TypeList';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Products } from '../resources/products';

const e = React.createElement;

export default class TypeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubtypeChange = this.handleSubtypeChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.state = { type: '', price: this.getProdPrice().toLocaleString('pt-br', {minimumFractionDigits: 2}) };
  }
  componentDidUpdate(prevProps){
    if(prevProps.size !== this.props.size){
        this.setState({          
          price: this.getProdPrice().toLocaleString('pt-br', {minimumFractionDigits: 2})
        });
    }
  }
  moeda(v){
    v = v.replace(/\D/g,"") // permite digitar apenas numero
    v = v.replace(/(\d{1})(\d{14})$/,"$1.$2") // coloca ponto antes dos ultimos digitos
    v = v.replace(/(\d{1})(\d{11})$/,"$1.$2") // coloca ponto antes dos ultimos 11 digitos
    v = v.replace(/(\d{1})(\d{8})$/,"$1.$2") // coloca ponto antes dos ultimos 8 digitos
    v = v.replace(/(\d{1})(\d{5})$/,"$1.$2") // coloca ponto antes dos ultimos 5 digitos
    v = v.replace(/(\d{1})(\d{1,2})$/,"$1,$2") // coloca virgula antes dos ultimos 2 digitos
    return v;
  }

  handleTypeChange(type) {
    this.setState({ 
      type }, 
      () => this.props.onTypeChange(type, this.props.prodName)
    );
  }
  handleSubtypeChange(subtype) {
    this.setState(subtype, () => {
      this.props.onSubtypeSet(this.state, this.props.prodName)
    });
  }
  handlePriceChange(e) {
    const price = this.moeda(e.target.value);
    if (this.state.subtype) {
      const state = Object.assign({}, this.state, {
        price
      })
      this.setState(state, () => {
        this.props.onSubtypeSet(this.state, this.props.prodName)
      });  
    } else {
      const state = Object.assign({}, this.state, {
        price
      })
      this.setState(state);  
    } 
  }
  getProdCategory() {
    return [0, 1, 2, 3].find((item) => 
      Products.categories[item][this.props.prodName]
    );
  }
  getProdPrice() {
    switch (this.getProdCategory()) {
      case 0:
        return Products.categories[0][this.props.prodName].size
          .filter((item) => item.name === this.props.size)
          .map((item) => item.price)
          .shift();
      case 1:
        return Products.categories[1][this.props.prodName].price;
      case 2:
        return 0;
      default:
        return 1.50;
    }
  }

  render() {
    return (
      e(Row, { bsPrefix: 'row m-1' },
        e(Col, null, [
          e('label', {
            className: 'label bg-danger',
            key: 1
          }, 'Subtipo'),
          e(TypeSelect, {
            onTypeChange: this.handleTypeChange,
            key: 2,
            prodName: this.props.prodName
          }),
          e(InputGroup, { 
              key: 3, 
              className: this.getProdCategory() === 2 ? 'd-none' : '' 
            }, [
              e(InputGroup.Prepend, { key: 'i-1' },
                e(InputGroup.Text, null, 'R$')),
              e(FormControl, { 
                key: 'i-2', 
                value: this.state.price,
                onChange: this.handlePriceChange 
              })
            ]
          ),
          e(TypeList, {
            type: this.state.type === 'Não Possui' ? this.props.prodName : this.state.type,
            key: 4,
            style: { borderBottom: 'none' },
            onSubtypeChange: this.handleSubtypeChange
          })
        ])
      )
    )
  }
}
