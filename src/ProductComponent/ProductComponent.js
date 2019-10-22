import React from 'react'
import ProductSelect from './ProductSelect'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

export default class ProductComponent extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange() {
    console.log('teste')
  }
  render() {
    return(
      React.createElement(
        ErrorBoundary,
        null,
        React.createElement(
          ProductSelect,
          { onProductChange: this.handleChange }
        )
      );
    )
  }
}
