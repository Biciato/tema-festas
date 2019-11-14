import React from "react"
import ProductSelect from "./ProductSelect"
import SizeSelect from "./SizeSelect"
import TypeComponent from "../TypeComponent/TypeComponent"
import TotalComponent from './TotalComponent'
import { Products } from '../resources/products'
import ClientComponent from "../ClientComponent/ClientComponent"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CartComponent from "../CartComponent/CartComponent"

const e = React.createElement

export default class ProductComponent extends React.Component {
  constructor(props) {
    super(props)
    this.handleMakeOrderClick = this.handleMakeOrderClick.bind(this)
    this.handleProductChange = this.handleProductChange.bind(this)
    this.handleSizeChange = this.handleSizeChange.bind(this)
    this.handleSubtypeSet = this.handleSubtypeSet.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.getCategorySet = this.getCategorySet.bind(this)
    this.getProdPrice = this.getProdPrice.bind(this)
    this.handleCartClick = this.handleCartClick.bind(this)
    this.state = {
      prods: {},
      cpts: [
        {
          name: ClientComponent,
          props: {
            onMakeOrderClick: this.handleMakeOrderClick
          }
        }
      ] 
    }
  }
  handleMakeOrderClick() {
    this.setState({
      cpts: [
        {
          name: ProductSelect,
          props: {
            onProductChange: this.handleProductChange
          }
        },
        {
          name: TotalComponent,
          props: {
            prods: this.state.prods
          }
        }
      ] 
    })
  }
  handleProductChange(prodName) {
    const prevProds = this.state.prods[prodName] 
      ? this.state.prods[prodName]
      : {} 
    const prevDados = this.state.prods[prodName] && this.state.prods[prodName].dados
      ? this.state.prods[prodName].dados
      : {}   
    let prods = Object.assign({}, this.state.prods, {
                  [prodName]: Object.assign({}, prevProds, {
                    tipo_categoria: this.getProdCategory(prodName),
                    dados: Object.assign({}, prevDados) 
                  })
                })
    if ([1, 3].includes(prods[prodName].tipo_categoria) && !this.state.prods[prodName]) {
      prods[prodName].valor_unitario = this.getProdPrice(prodName)
    }
    const cpts = [this.state.cpts[0], this.state.cpts[1]]
    let cpt = {}
    if (prods[prodName].tipo_categoria !== 0) {
      cpt = {
        name : TypeComponent,
        props: { 
          onSubtypeSet : this.handleSubtypeSet,
          onTypeChange : this.handleTypeChange,
          prodName,
          key: 2
        }
      }      
    } else {
      cpt = {
        name : SizeSelect,
        props: {
          onSizeChange : this.handleSizeChange,
          prodName,
          key: 2
        }
      }      
    } 
    cpts.push({...cpt})
    this.setState({prods, cpts})
  }
  handleSizeChange(size, prodName) {
    const cpts = [this.state.cpts[0], this.state.cpts[1], this.state.cpts[2]]
    cpts.push({
      name: TypeComponent,
      props: {
        key: 3,
        size,
        prodName,
        onSubtypeSet: this.handleSubtypeSet,
        onTypeChange: this.handleTypeChange
      }
    })
    const prods = Object.assign({}, this.state.prods, {
      [prodName]: Object.assign({}, this.state.prods[prodName], {
        dados: Object.assign({}, this.state.prods[prodName].dados, {
          [size]: this.state.prods[prodName].dados[size]
            ? Object.assign({}, this.state.prods[prodName].dados[size])
            : {
              valor_unitario: this.getProdPrice(prodName, size)
            }
        })
      })
    })
    this.setState({
      prods,
      cpts
    })
  }
  handleTypeChange(type, prodName, size = null) {
    let prod = Object.assign({}, this.state)
    if (this.getProdCategory(prodName) === 0) {
      prod.prods[prodName].dados[size] = Object.assign(
        {}, 
        this.state.prods[prodName].dados[size], {
        [type]: null
      })
      this.setState(prod)
    } else if (this.getProdCategory(prodName) === 1) {
      const prevDados = this.state.prods[prodName].dados ? this.state.prods[prodName].dados : {}
      prod.prods[prodName].dados = prevDados
      this.setState(prod)
    }
    
  }
  handleSubtypeSet(typeObj, prodName, size = null) {
    console.log(typeObj)
    let prods = {}
    switch (this.getProdCategory(prodName)) {
      case 0:
        prods = Object.assign({}, this.state.prods, {
          [prodName]: {
            tipo_categoria: 0,
            dados: Object.assign({}, this.state.prods[prodName].dados, {
              [size]: Object.assign({}, this.state.prods[prodName].dados[size], {
                [typeObj.type]: Object.assign(
                  {}, 
                  this.state.prods[prodName].dados[size][typeObj.type], 
                  {
                    [Object.keys(typeObj.subtype.subtypeObj)[0]]:
                      typeObj.subtype.subtypeObj[Object.keys(typeObj.subtype.subtypeObj)[0]].qty
                  }
                )
              }) 
            })
          }
        })
        break
      case 1:
        prods = Object.assign({}, this.state.prods, {
          [prodName]: {
            valor_unitario: this.getProdPrice(prodName),
            tipo_categoria: 1,
            dados: Object.assign({}, this.state.prods[prodName].dados, {
              [typeObj.type]: Object.assign(
                {}, 
                this.state.prods[prodName].dados[typeObj.type], 
                {
                  [Object.keys(typeObj.subtype.subtypeObj)[0]]:
                    typeObj.subtype.subtypeObj[Object.keys(typeObj.subtype.subtypeObj)[0]].qty
                }
              )
            })
          }
        })
        break
      case 2:
        prods = Object.assign({}, this.state.prods, {
          [prodName]: {
            tipo_categoria: 2,
            dados: Object.assign({}, this.state.prods[prodName].dados, {
              [Object.keys(typeObj.subtype.subtypeObj)[0]]: {
                quantidade: typeObj.subtype.subtypeObj[Object.keys(typeObj.subtype.subtypeObj)[0]].qty,
                valor_unitario: typeObj.subtype.subtypeObj[Object.keys(typeObj.subtype.subtypeObj)[0]].price
              }
            })
          }
        })
        break
      default:
        prods = Object.assign({}, this.state.prods, {
          [prodName]: {
            tipo_categoria: 3,
            valor_unitario: typeObj.price ? typeObj.price : this.state.prods[prodName].valor_unitario,
            dados: Object.assign({}, this.state.prods[prodName].dados, {
              [Object.keys(typeObj.subtype.subtypeObj)[0]]:
                typeObj.subtype.subtypeObj[Object.keys(typeObj.subtype.subtypeObj)[0]].qty
            })
          }
        })
        break
    }
    const newCpts = this.state.cpts.map((e, i) => i === 1 
      ? {
        name: TotalComponent,
            props: {
              prods,
              onCartClick: this.handleCartClick
            }
      }
      : e
    )    
    this.setState({cpts: newCpts, prods})
  }
  handleCartClick(totalQty,totalPrice) {
    let cpts = this.state.cpts.map((el) =>
      Object.assign({}, el, {
        props: Object.assign({}, el.props, {
          display: true
        })
      })
    )
    cpts.push({
      name: CartComponent,
      props: {
        prods: this.state.prods,
        totalQty,
        totalPrice
      }
    })
    this.setState({cpts})
  }
  getCategorySet(categoryName) {
    return Object.keys(this.state.categorias).find((item) =>
      item === categoryName
    )
  }
  getProdCategory(prodName) {
    return [0, 1, 2, 3].find((item) =>
      Products.categories[item][prodName]
    )
  }
  getProdPrice(prodName, size = null) {
    if (this.getProdCategory(prodName) === 0) {
      return Products.categories[0][prodName].size.find((item) =>
        item.name === size
      ).price
    } else {
      return Products.categories[this.getProdCategory(prodName)][prodName].price
        .toLocaleString('pt-br', { minimumFractionDigits: 2 })
    }
  }

  render() {
    /* const prods = Object.keys(this.state)
      .filter((item) => !["size", "type"].includes(item))
      .reduce((o, key) => ({ ...o, [key]: this.state[key] }), {}) */
    return (
      e(Row, null,
        e(Col, null,
          this.state.cpts.map((item) => 
            e(item.name, item.props, item.children)
          )
        )
      )
    )
  }
}
