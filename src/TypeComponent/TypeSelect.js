import React from 'react'
import Select from 'react-select'
import {
  Types
} from '../resources/types'

const e = React.createElement

export default class TypeSelect extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubtypeChange = this.handleSubtypeChange.bind(this)
    this.state = {
      typeArr: null
    }
  }
  handleChange(type) {
    const typeArr = type.value === 'number' ?
      Array.from(Array(10), (e, i) => i + 1) :
      Types[type.value]
    this.setState({
      typeArr: this.creatTypeObj(typeArr)
    })
    this.props.onTypeChange(type.value)
  }
  creatTypeObj(list) {
    return list.reduce((o, key) => ({
      ...o,
      [key]: {
        price: 1.50,
        qty: 0
      }
    }), {})
  }
  handleSubtypeChange(subtype) {
    this.props.onSubtypeUpdate(subtype)
  }
  render() {
    return (
      e(Select, {
        options: ['poa', 'liso', 'number', 'themes'].map((item) => ({
          value: item,
          label: item
        })),
        onChange: this.handleChange,
        key: 2
      })
    )
  }
}
