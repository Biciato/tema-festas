import React from "react";
import ProductSelect from "./ProductSelect";
import SizeSelect from "./SizeSelect";
import TypeComponent from "../TypeComponent/TypeComponent";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Container from 'react-bootstrap/Container';
import TotalComponent from './TotalComponent';
import { Products } from '../resources/products'

const e = React.createElement;

export default class ProductComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleSubtypeSet = this.handleSubtypeSet.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.getCategorySet = this.getCategorySet.bind(this);
    this.getProdPrice = this.getProdPrice.bind(this);
    this.state = {
      size: {
        sizeCpt: "div",
        sizeProps: {
          key: 2
        }
      },
      type: {
        typeCpt: "div",
        typeProps: {
          key: 3
        }
      }
    };
  }
  handleProductChange(prodName) {
    this.setState({
      [prodName] : {
        tipo_categoria: this.getProdCategory(prodName),
        dados: ''
      },
      size: {
        sizeCpt: SizeSelect,
        sizeProps: {
          product: prodName,
          onSizeChange: this.handleSizeChange,
          key: 2
        }
      },
      type: {
        typeCpt: "div",
        typeProps: {
          key: 3
        }
      }
    }, () => {
      if ( [1,3].includes(this.state[prodName].tipo_categoria) ) {
        const prod = Object.assign({}, this.state[prodName], {
          valor_unitario: this.getProdPrice(prodName)
        })
        this.setState({
          [prodName] : prod
        });
      }
    });    
  }
  handleSizeChange(size, prodName) {
    if (size !== 'único') {
      this.setState({ 
        [prodName] : Object.assign({}, this.state[prodName], {
          dados: Object.assign({}, this.state[prodName].dados, {
            [size]: null        
          })                      
        }) 
      });
    }
    this.setState({
      type: {
        typeCpt: TypeComponent,
        typeProps: {
          key: 3,
          size,
          prodName,
          onSubtypeSet: this.handleSubtypeSet,
          onTypeChange: this.handleTypeChange
        }
      }
    })
  }
  handleTypeChange(type, prodName) {
    let prod = Object.assign({}, this.state);
    if ( this.getProdCategory(prodName) === 0 ) {
      prod[prodName].dados[this.state.type.typeProps.size] = Object.assign({}, this.state[prodName].dados[this.state.type.typeProps.size],{
        [type] : null,
        valor_unitario: this.getProdPrice(prodName)
      });
      this.setState(prod);
    } else if ( this.getProdCategory(prodName) === 1 ) {
      const prevDados = this.state[prodName].dados ? this.state[prodName].dados : {};
      prod[prodName].dados = prevDados;
      this.setState(prod);
    }
  }
  handleSubtypeSet(typeObj, prodName) {
    let prod = {};
    let dados = {};
    let prevDados = {};
    let prevSubtypes = {};
    switch (this.getProdCategory(prodName)) {
      case 0:
        prevSubtypes = this.state[prodName].dados[this.state.type.typeProps.size] 
                              ?  this.state[prodName].dados[this.state.type.typeProps.size][typeObj.type]
                              : {}; 
        const subtypes = Object.assign({}, prevSubtypes,{
          [Object.keys(typeObj.subtype.subtypeObj)[0]] : 
            typeObj.subtype.subtypeObj[Object.keys(typeObj.subtype.subtypeObj)[0]].qty
        });
        const types = Object.assign({}, this.state[prodName].dados[this.state.type.typeProps.size],{
          [typeObj.type] : subtypes
        })
        const sizes = Object.assign({}, this.state[prodName].dados, {
          [this.state.type.typeProps.size] : types
        })
        prod = {
          [prodName] : {
            dados : sizes
            }
        }
        break;
      case 1:
        prevDados = this.state[prodName].dados ? this.state[prodName].dados : {};
        prevSubtypes = this.state[prodName].dados[typeObj.type] 
                              ?  this.state[prodName].dados[typeObj.type]
                              : {};
        dados = Object.assign({},prevDados, {
          [typeObj.type] : Object.assign({}, prevSubtypes, {
            [Object.keys(typeObj.subtype.subtypeObj)[0]] : 
              typeObj.subtype.subtypeObj[Object.keys(typeObj.subtype.subtypeObj)[0]].qty
          })     
        });
        prod = {
          [prodName] : {
            tipo_categoria : this.state[prodName].tipo_categoria,
            valor_unitario : this.state[prodName].valor_unitario,
            dados
          }
        }
        break;
      case 2:
        prevDados = this.state[prodName].dados ? this.state[prodName].dados : {};
        dados = Object.assign({}, prevDados, {
          [Object.keys(typeObj.subtype.subtypeObj)[0]] : {
            quantidade : typeObj.subtype.subtypeObj[Object.keys(typeObj.subtype.subtypeObj)[0]].qty,
            valor_unitario : typeObj.subtype.subtypeObj[Object.keys(typeObj.subtype.subtypeObj)[0]].price
          }            
        });
        prod = {
          [prodName] : {
            tipo_categoria : this.state[prodName].tipo_categoria,
            dados
          }
        }
        break;
      default:
        prevDados = this.state[prodName].dados ? this.state[prodName].dados : {};
        dados = Object.assign({},prevDados, {
          [Object.keys(typeObj.subtype.subtypeObj)[0]] : 
              typeObj.subtype.subtypeObj[Object.keys(typeObj.subtype.subtypeObj)[0]].qty
        });
        prod = {
          [prodName] : {
            tipo_categoria : this.state[prodName].tipo_categoria,
            valor_unitario : this.state[prodName].valor_unitario,
            dados
          }
        }
        break;
    }    
    this.setState(prod);
    console.log(this.state);
  }
  getCategorySet(categoryName) {
    return Object.keys(this.state.categorias).find((item) =>
      item === categoryName  
    );
  }
  getProdCategory(prodName) {
    return [0, 1, 2, 3].find((item) => 
      Products.categories[item][prodName]
    );
  }
  getProdPrice(prodName) {
    if (this.getProdCategory(prodName) === 0) {
      return Products.categories[0][prodName].size.find((item) =>
        item.name === this.state.type.typeProps.size
      ).price
    } else {
      return Products.categories[this.getProdCategory(prodName)][prodName].price;
    }    
  }
    
  render() {
    return (
      e(ErrorBoundary, null,
        e(Container, { fluid: true }, [
          e(ProductSelect, {
            onProductChange: this.handleProductChange,
            key: 1
          }),
          e(this.state.size.sizeCpt, this.state.size.sizeProps),
          e(this.state.type.typeCpt, this.state.type.typeProps),
          e(TotalComponent)
        ])
      )
    );
  }
}
