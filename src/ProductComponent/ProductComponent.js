import React from "react";
import ProductSelect from "./ProductSelect";
import SizeSelect from "./SizeSelect";
import TypeComponent from "../TypeComponent/TypeComponent";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const e = React.createElement;

export default class ProductComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleSubtypeSet = this.handleSubtypeSet.bind(this);
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
      },
      addBtn: {
        addBtnCpt: "div",
        addBtnProps: {
          key: 4
        }
      }
    };
  }
  handleProductChange(prodName) {
    this.setState({
      product: {
        category: prodName.value},
      size: {
        sizeCpt: SizeSelect,
        sizeProps: {
          product: prodName.value,
          onSizeChange: this.handleSizeChange,
          key: 2
        }
      }
    });
  }
  handleSizeChange(size, prodName) {
    const product = Object.assign({
      size: size.value
    }, this.state.product);
    this.setState({
      product,
      type: {
        typeCpt: TypeComponent,
        typeProps: {
          prodName,
          onSubtypeSet: this.handleSubtypeSet,
          key: 3
        }
      }
    });
  }
  handleSubtypeSet(subtype) {
    const product = Object.assign({}, this.state.product, subtype); 
    this.setState({ product });
  }
  render() {
    return e(ErrorBoundary, null, [
      e(ProductSelect, {
        onProductChange: this.handleProductChange,
        key: 1
      }),
      e(this.state.size.sizeCpt, this.state.size.sizeProps),
      e(this.state.type.typeCpt, this.state.type.typeProps)
    ]);
  }
}
