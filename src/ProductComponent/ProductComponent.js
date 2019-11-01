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
          dados: {
            [size]: null 
          }                      
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
    let prod = Object.assign(
      {}, 
      this.state
    );
    if ( this.getProdCategory(prodName) === 0 ) {
      prod[prodName].dados[this.state.type.typeProps.size] = {
        [type] : null,
        valor_unitario: this.getProdPrice(prodName)
      };
      this.setState(prod);
    } else if ( this.getProdCategory(prodName) === 1 ) {
      prod[prodName].dados = {
        [type] : null
      };
      this.setState(prod);
    }
  }
  handleSubtypeSet(subtype, prodName) {

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
