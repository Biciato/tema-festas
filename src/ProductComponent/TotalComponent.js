import React from 'react'
import Badge from 'react-bootstrap/Badge';
import './TotalComponent.css';

export default class TotalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.getCat1UnitPrice = this.getCat1UnitPrice.bind(this);
        this.getCat1Qties = this.getCat1Qties.bind(this);
        this.getCat2UnitPrice = this.getCat2UnitPrice.bind(this);
        this.getCat2Qties = this.getCat2Qties.bind(this);
        this.state = {total: '0,00'};
    }
    componentDidUpdate(prevProps){
        if(prevProps.prods !== this.props.prods){
            this.setState({          
              total: this.getTotalCat1(this.props.prods).toLocaleString('pt-br', {minimumFractionDigits: 2})
            });
        }
    }
    getTotalCat3(prods) {
        if (prods.etiquetas && prods.etiquetas.valor_unitario) {
            const unitPrice = parseFloat(prods.etiquetas.valor_unitario.replace(',','.'));
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
            return parseFloat(this.props.prods[item].valor_unitario.replace(',','.'));
        } else {
            return 0;
        }       
    }
    getCat1Qties(item) {
        if (this.props.prods[item] && this.props.prods[item].dados) {
            return Object.keys(this.props.prods[item].dados).reduce((old, i) => 
                        Object.keys(this.props.prods[item].dados[i]).reduce((o, k) => 
                            parseInt(this.props.prods[item].dados[i][k]) + o, 0
                        ) + old, 0
                    );
        } else {
            return 0;
        }    
    }
    getTotalCat2(prods) {
        return Object.keys(prods).reduce((o, item) =>
             this.getCat1UnitPrice(item) * this.getCat1Qties(item) + o, 0
        ); 
     }
 
     getCat2UnitPrice(item) {
         if (this.props.prods[item] && this.props.prods[item].valor_unitario) {
             return parseFloat(this.props.prods[item].valor_unitario.replace(',','.'));
         } else {
             return 0;
         }       
     }
     getCat2Qties(item) {
         if (this.props.prods[item] && this.props.prods[item].dados) {
             return Object.keys(this.props.prods[item].dados).reduce((old, i) => 
                         Object.keys(this.props.prods[item].dados[i]).reduce((o, k) => 
                             parseInt(this.props.prods[item].dados[i][k]) + o, 0
                         ) + old, 0
                     );
         } else {
             return 0;
         }    
     }
    
    render() {
        return(
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