import React from 'react'
import Select from 'react-select'
import { Products } from '../resources/products'

const e = React.createElement

export default class TypeSelect extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubtypeChange = this.handleSubtypeChange.bind(this)
  }
  handleSubtypeChange(subtype) {
    this.props.onTypeChange(subtype)
  }
  getProdCategory() {
    return [0, 1, 2, 3].filter((item) => Products.categories[item][this.props.prodName])[0];
  }
  render() {
    const list = [0, 1].includes(this.getProdCategory()) 
      ? ['poa', 'liso', 'number', 'themes'].map((item) => ({
        value: item,
        label: item
      }))
      : [{
        value: 'Não Possui',
        label: 'Não Possui'
      }]
    return (
      e(Select, {
        options: list,
        onChange: this.handleSubtypeChange
      })
    )
  }
}
