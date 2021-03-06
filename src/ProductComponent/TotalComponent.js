import React from 'react'
import './TotalComponent.css'
import { Products } from '../resources/products'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'

export default class TotalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.getTotalCat1 = this.getTotalCat1.bind(this);
        this.getCat1UnitPrice = this.getCat1UnitPrice.bind(this);
        this.getCat1Qties = this.getCat1Qties.bind(this);
        this.getCat1Prods = this.getCat1Prods.bind(this);
        this.getTotalCat2 = this.getTotalCat2.bind(this);
        this.getCat2Prods = this.getCat2Prods.bind(this);
        this.getCat2TotalPerProd = this.getCat2TotalPerProd.bind(this);
        this.getTotalCat0 = this.getTotalCat0.bind(this);
        this.getCat0Prods = this.getCat0Prods.bind(this);
        this.getCat0TotalPerProd = this.getCat0TotalPerProd.bind(this);
        this.getCat0PerTypes = this.getCat0PerTypes.bind(this);
        this.getCat0PerSubtypes = this.getCat0PerSubtypes.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = { totalPrice: '0,00', totalQty: 0 };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.prods !== this.props.prods) {
            this.setState({
                totalPrice: 
                    (this.getTotalCat0(this.props.prods) +
                    this.getTotalCat1(this.props.prods) +
                    this.getTotalCat2(this.props.prods) +
                    this.getTotalCat3(this.props.prods)).toLocaleString('pt-br', { minimumFractionDigits: 2 }),
                totalQty: this.getTotalQty()
            });
        }
    }
    getTotalCat3(prods) {
        if (prods.etiquetas && prods.etiquetas.valor_unitario) {
            const unitPrice = parseFloat(prods.etiquetas.valor_unitario.replace(',', '.'));
            const qty = Object.keys(prods.etiquetas.dados).reduce((o, item) =>
                parseInt(prods.etiquetas.dados[item]) + o, 0
            );
            return (unitPrice * qty);
        } else {
            return 0
        }
    }
    getTotalCat1(prods) {
        return this.getCat1Prods(prods).reduce((o, item) =>
            this.getCat1UnitPrice(item) * this.getCat1Qties(item) + o, 0
        )
    }
    getCat1Prods(prods) {
        return(
            Object.keys(prods).filter((item) => 
                Products.categories[1][item] 
            )
        );
    }

    getCat1UnitPrice(item) {
        if (this.props.prods[item] && this.props.prods[item].valor_unitario) {
            return parseFloat(this.props.prods[item].valor_unitario.replace(',', '.'));
        } else {
            return 0;
        }
    }
    getCat1Qties(item) {
        if (this.props.prods[item] && this.props.prods[item].dados) {
            return (
                Object.keys(this.props.prods[item].dados).reduce((old, i) =>
                    Object.keys(this.props.prods[item].dados[i]).reduce((o, k) =>
                        parseInt(this.props.prods[item].dados[i][k]) + o, 0
                    ) + old, 0
                )
            );
        } else {
            return 0
        }
    }
    getTotalCat2(prods) {
        return(
            this.getCat2Prods(prods).reduce((o, item) =>
                this.getCat2TotalPerProd(item) + o, 0
            )
        )
    }
    getCat2Prods(prods) {
        return(
            Object.keys(prods).filter((item) => 
                Products.categories[2][item] 
            )
        );
    }
    getCat2TotalPerProd(item) {
        if (this.props.prods[item] && this.props.prods[item].dados) {
            return(
                Object.keys(this.props.prods[item].dados).reduce((o, k) =>
                    parseInt(this.props.prods[item].dados[k].quantidade) * 
                    parseFloat(this.props.prods[item].dados[k].valor_unitario.replace(',','.')) + 
                    o, 0 
                )
            )
        } else {
            return 0
        }        
    }
    getTotalCat0(prods) {
        return(
            this.getCat0Prods(prods).reduce((o, item) =>
                this.getCat0TotalPerProd(item) + o, 0
            )
        ); 
    }
    getCat0Prods(prods) {
        return(
            Object.keys(prods).filter((item) => 
                Products.categories[0][item] 
            )
        );
    }
    getCat0TotalPerProd(item) {
        if (this.props.prods[item].dados !== '') {
            return(
                Object.keys(this.props.prods[item].dados).reduce((o, k) =>
                   this.getCat0PerTypes(item, k) + o, 0
                )
            )
        } else {
            return 0;
        }
    }
    
    getCat0PerTypes(item, type) {
        if (this.props.prods[item].dados[type] !== null) {
            return(
                Object.keys(this.props.prods[item].dados[type]).filter((item) =>
                    item !== 'valor_unitario'
                ).reduce((old, key) => 
                    this.getCat0PerSubtypes(item, type, key) + old, 0
                ) 
            )
        } else {
            return 0;
        }        
    }

    getCat0PerSubtypes(item, type, subtype) {
        if (this.props.prods[item].dados[type][subtype] !== null) {
            return(
                Object.keys(this.props.prods[item].dados[type][subtype]).filter((st) =>
                    this.props.prods[item].dados[type][subtype][st] !== ''
                ).reduce((o, k) =>
                    parseInt(this.props.prods[item].dados[type][subtype][k]) + o, 0
                ) * this.props.prods[item].dados[type].valor_unitario
            )
        } else {
            return 0;
        }   
    }
    getTotalQtyCat0(prods) {
        return Object.keys(prods)
                .filter((el) => prods[el].tipo_categoria === 0)
                .reduce((old, key) =>
                    Object.keys(prods[key].dados).reduce((ol, ke) => 
                        Object.keys(prods[key].dados[ke])
                            .filter((e) => e !== 'valor_unitario' || prods[key].dados[ke][e] !== null)
                            .reduce((o, k) => 
                                this.getTotalQtyCat0LastLevel(prods, key, ke, k)                 
                                + o, 0
                            )
                        + ol, 0
                    ) 
                    + old, 0    
                )        
    }
    getTotalQtyCat0LastLevel(prods, key, ke, k) {
        if(k !== 'valor_unitario' && prods[key].dados[ke][k] !== null) {
            return(
                Object.keys(prods[key].dados[ke][k]).reduce((l, i) => 
                    parseInt(prods[key].dados[ke][k][i]) + l, 0
                )  
            )
        } else {
            return 0
        }        
    }
    getTotalQtyCat1(prods) {
        return Object.keys(prods)
                .filter((el) => prods[el].tipo_categoria === 1)
                .reduce((old, key) =>
                    Object.keys(prods[key].dados).reduce((ol, ke) => 
                        Object.keys(prods[key].dados[ke])
                            .reduce((o, k) => parseInt(prods[key].dados[ke][k]) + o, 0)
                        + ol, 0
                    ) 
                    + old, 0    
                )        
    }
    getTotalQtyCat2(prods) {
        return Object.keys(prods)
                .filter((el) => prods[el].tipo_categoria === 2)
                .reduce((old, key) =>
                    Object.keys(prods[key].dados).reduce((ol, ke) => 
                        parseInt(prods[key].dados[ke].quantidade)
                        + ol, 0
                    ) 
                    + old, 0    
                )        
    }
    
    getTotalQtyCat3(prods) {
        if (prods['etiquetas']) {
            return Object
                .keys(prods['etiquetas'].dados)
                .reduce((old, key) => parseInt(prods['etiquetas'].dados[key]) + old, 0 )    
        } else {
            return 0
        }
            
    }
    getTotalQty() {
        if (this.props.prods !== null) {
            return(
                this.getTotalQtyCat0(this.props.prods) +
                this.getTotalQtyCat1(this.props.prods) +
                this.getTotalQtyCat2(this.props.prods) +
                this.getTotalQtyCat3(this.props.prods)
            )
        } else {
            return 0
        }        
    }
    handleClick() {
        this.props.onCartClick(this.state.totalQty, this.state.totalPrice)
    }
    render() {
        console.log(this.getTotalQty()) 
        return (
            <div className={"footer" + (this.props.display ? ' d-none' : '')}>
                <span onClick={this.handleClick}>
                    <FontAwesomeIcon icon={faShoppingBag}/>
                    Sacola:
                </span>
                <span>R$ {this.state.totalPrice}</span>
            </div>
        );
    }
}