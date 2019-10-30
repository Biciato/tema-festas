import React from 'react'
import Select from 'react-select'

const e = React.createElement

export default class TypeSelect extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubtypeChange = this.handleSubtypeChange.bind(this)
  }
  handleSubtypeChange(subtype) {
    this.props.onTypeChange(subtype)
  }
  render() {
    return (
      e(Select, {
        options: ['poa', 'liso', 'number', 'themes'].map((item) => ({
          value: item,
          label: item
        })),
        onChange: this.handleSubtypeChange,
        key: 2
      })
    )
  }
}
