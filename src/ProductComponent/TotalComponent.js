import React from 'react'
import Badge from 'react-bootstrap/Badge';
import './TotalComponent.css';
import { Products } from '../resources/products';

export default class TotalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.getCat1UnitPrice = this.getCat1UnitPrice.bind(this);
        this.getCat1Qties = this.getCat1Qties.bind(this);
        this.getTotalCat2 = this.getTotalCat2.bind(this);
        this.getCat2Prods = this.getCat2Prods.bind(this);
        this.getCat2TotalPerProd = this.getCat2TotalPerProd.bind(this);
        this.getTotalCat0 = this.getTotalCat0.bind(this);
        this.getCat0Prods = this.getCat0Prods.bind(this);
        this.getCat0TotalPerProd = this.getCat0TotalPerProd.bind(this);
        this.getCat0QtyPerType = this.getCat0QtyPerType.bind(this);
        this.state = { total: '0,00' };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.prods !== this.props.prods) {
            this.setState({
                total: this.getTotalCat2(this.props.prods).toLocaleString('pt-br', { minimumFractionDigits: 2 })
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
        }
    }
    getTotalCat1(prods) {
        return Object.keys(prods).reduce((o, item) =>
            this.getCat1UnitPrice(item) * this.getCat1Qties(item) + o, 0
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
            return 0;
        }
    }
    getTotalCat2(prods) {
        return(
            Object.keys(prods).reduce((o, item) =>
                this.getCat2TotalPerProd(item) + o, 0
            )
        ); 
    }
    getCat2Prods() {
        return(
            Object.keys(this.props.prods).filter((item) => 
                Products.categories[2][item] 
            )
        );
    }
    getCat2TotalPerProd(item) {
        return(
            Object.keys(this.props.prods[item].dados).reduce((o, k) =>
                parseInt(this.props.prods[item].dados[k].quantidade) * 
                parseFloat(this.props.prods[item].dados[k].valor_unitario.replace(',','.')) + 
                o, 0 
            )
        );
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
        return(
            Object.keys(this.props.prods[item].dados).reduce((o, k) =>
                this.getCat0QtyPerType(item, k) * 
                parseFloat(this.props.prods[item].dados[k].valor_unitario.replace(',','.')) + 
                o, 0 
            )
        );
    }
    getCat0QtyPerType(item, type) {
        return(
            Object.keys(this.prods[item].dados[type]).reduce((o, k) =>
                parseInt(this.prods[item].dados[type][subtype][k]) + o, 0
            )
        ) 
    }
    getCat0Subtypes(item, type) {
        return(
            Object.keys(this.prods[item].dados[type]).filter((item) => 
                item !== 'valor_unitario'
            )
        )
    }
    render() {
        return (
            <div className="footer">
                <h6 className="bg-danger text-light p-1 text-right">
                    TOTAL:
                    <Badge variant="danger">
                        {this.state.total}
                    </Badge>
                </h6>
            </div>
        );
    }
}