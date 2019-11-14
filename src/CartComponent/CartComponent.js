import React from 'react'

export default class CartComponent extends React.Component {
    constructor(props) {
        super(props)
        this.getTotalPricePerProduct = this.getTotalPricePerProduct.bind(this)
        this.getTotalQtyCat2 = this.getTotalQtyCat2.bind(this)
        this.getTotalPriceCat2 = this.getTotalPriceCat2.bind(this)
        this.getTotalQtyCat0 = this.getTotalQtyCat0.bind(this)
        this.getTotalPriceCat0 = this.getTotalPriceCat0.bind(this)
        this.mountCat0List = this.mountCat0List.bind(this)
        this.mountCat1List = this.mountCat1List.bind(this)
        this.mountCat2List = this.mountCat2List.bind(this)
        this.mountCat3List = this.mountCat3List.bind(this)
        this.mountProdList = this.mountProdList.bind(this)
    } 
    getTotalQtyPerProduct(item) {
        if(item !== undefined) {
            return Object.keys(item).reduce((o, k) => parseInt(item[k]) + o, 0)
        } 
    }
    getTotalPricePerProduct(item, price) {
        console.log(price)
        return (this.getTotalQtyPerProduct(item) * parseFloat(price.replace(',','.')))
    }
    getTotalQtyCat2(item) {
        if(item !== undefined) {
            return Object.keys(item).reduce((o, k) => parseInt(item[k].quantidade) + o, 0)
        } 
    }
    getTotalPriceCat2(item) {
        if(item !== undefined) {
            return Object.keys(item).reduce((o, k) => 
                (parseInt(item[k].quantidade) * 
                    parseFloat(item[k].valor_unitario.replace(',','.'))) + o, 0
            )
        } 
    }
    getTotalQtyCat0(item) {
        if(item !== undefined) {
            return Object.keys(item).reduce((o, k) => 
                Object.keys(item[k]).reduce((old, key) => parseInt(item[k][key]) + old, 0) + o, 0
            )
        } 
    }
    getTotalPriceCat0(item, price) {
        return (this.getTotalQtyCat0(item) * parseFloat(price))
    }
    mountCat0List(item) {
        if(this.props.prods[item].tipo_categoria === 0) {
            return(
                Object.keys(this.props.prods[item].dados).map((i) =>
                    <div>
                        <div>
                            <span>{item + ' ' + i}</span>    
                            <span>R$ {this.props.prods[item].dados[i].valor_unitario}</span>  
                        </div>
                        {Object.keys(this.props.prods[item].dados[i])
                            .filter((i) => i !== 'valor_unitario')
                            .map((el) =>
                                Object.keys(this.props.prods[item].dados[i][el]).map((e) =>
                                    <div>
                                        <div>
                                            <div>
                                                <span>{el + ' ' + e }</span>    
                                                <span>{this.props.prods[item].dados[i][el][e]}</span>  
                                            </div>                           
                                        </div>
                                    </div>
                                )
                                
                            )
                        }
                        <div>
                            <span>
                                Quantidade: {
                                    this.getTotalQtyPerProduct(this.props.prods[item].dados[i])
                                }
                            </span>    
                            <span>
                                Total: R$ {
                                    this.getTotalPricePerProduct(
                                        this.props.prods[item].dados[i], 
                                        this.props.prods[item].dados[i].valor_unitario)
                                }
                            </span>  
                        </div>
                    </div>
                )                   
            )
        } else {
            return this.mountCat1List(item)
        }
    }
    mountCat1List(item) {
        if(this.props.prods[item].tipo_categoria === 1) {
            return(
                Object.keys(this.props.prods[item].dados).map((i) =>
                    <div>
                        <div>
                            <span>{item + ' ' + i}</span>    
                            <span>R$ {this.props.prods[item].valor_unitario}</span>  
                        </div>                        
                        <div>
                            {Object.keys(this.props.prods[item].dados[i]).map((el) =>
                                <div>
                                    <span>{el}</span>    
                                    <span>{this.props.prods[item].dados[i][el]}</span>  
                                </div>
                            )}
                        </div>
                        <div>
                            <span>
                                Quantidade: {this.getTotalQtyPerProduct(this.props.prods[item].dados[i])}
                            </span>    
                            <span>
                                Total: R$ {
                                    this.getTotalPricePerProduct(
                                        this.props.prods[item].dados[i], 
                                        this.props.prods[item].valor_unitario)
                                }
                            </span>  
                        </div>
                    </div>
                )                   
            )
        } else {
            return this.mountCat2List(item)
        }
    }
    mountCat2List(item) {
        if(this.props.prods[item].tipo_categoria === 2) {
            return(
                <div>
                    <div>
                        <span>{item}</span> 
                    </div>
                    {Object.keys(this.props.prods[item].dados).map((i) =>
                        <div>
                            <div>
                                <span>{i}</span>    
                                <span>{this.props.prods[item].dados[i].quantidade}</span>  
                            </div>
                            <div>
                                <span>Valor Unitário</span>    
                                <span>{this.props.prods[item].dados[i].valor_unitario}</span>  
                            </div>
                        </div>
                    )}
                    <div>
                        <span>
                            Quantidade: {this.getTotalQtyCat2(this.props.prods[item].dados)}
                        </span>    
                        <span>
                            Total: R$ {this.getTotalPriceCat2(this.props.prods[item].dados)}
                        </span>  
                    </div>
                </div>              
            )
        } else {
            return this.mountCat3List(item)
        }
    }
    mountCat3List(item) {
        return(
            <div>
                <div style={{padding: '0.1em', height: '3em'}}>
                    <span style={{fontSize: '1.1rem',fontWeight: 'bold',padding: '0.4em'}}>{item}</span>    
                    <span style={{
                        float: 'right',
                        border: '1px solid silver',                     
                        borderRadius: '5px',                  
                        padding: '0.4em',                    
                        color: 'darkgray'
                    }}>R$ {this.props.prods[item].valor_unitario}</span>  
                </div>
                    {Object.keys(this.props.prods[item].dados).map((el) =>
                        <div style={{padding: '0.1em', height: '3em'}}>
                            <span style={{fontWeight: 600,padding: '0.4em'}}>{el}</span>    
                            <span style={{
                                float: 'right',         
                                padding: '0.4em',                    
                                color: 'darkgray'
                            }}>{this.props.prods[item].dados[el]}</span>  
                        </div>
                    )}
                <div style={{padding: '0.1em', height: '3em'}}>
                    <span style={{fontWeight: 'bold',padding: '0.4em'}}>Quantidade: </span>
                    <span>{this.getTotalQtyPerProduct(this.props.prods[item].dados)}</span>    
                    <span style={{fontWeight: 'bold',padding: '0.4em'}}>
                        Total: R$ 
                    </span>  
                    <span style={{
                        float: 'right',
                        padding: '0.4em',                    
                        color: 'darkgray'
                    }}>
                        {
                            this.getTotalPricePerProduct(
                                this.props.prods[item].dados, 
                                this.props.prods[item].valor_unitario).toLocaleString('pt-br', {minimumFractionDigits: 2})
                        }
                    </span> 
                </div>
            </div>
        )
    }
    mountProdList() {
        return Object.keys(this.props.prods).map((item) => 
            this.mountCat0List(item)
        )
    }
    render() {
        return(       
            <div>     
                <h5 className="text-left mt-3" key="1" style={{padding: '0 0.5em'}}>Seus itens</h5>    
                <h6 className="text-left mt-3" key="2" style={{padding: '0 0.5em'}}>Nº do pedido 8824</h6> 
                {this.mountProdList()}
                <hr></hr>
                <div style={{padding: '0.1em', height: '3em', color: '#32338D', fontWeight: 'bold'}}>
                    <span>Quantidade:</span>    
                    <span style={{float: 'right'}}>{this.props.totalQty}</span>  
                </div>
                <div style={{padding: '0.1em', height: '3em', color: '#32338D', fontWeight: 'bold'}}>
                    <span>Valor:</span>    
                    <span style={{float: 'right'}}>R$ {this.props.totalPrice}</span>  
                </div>
                <div className="footer">
                    Finalizar a Compra
                </div>
            </div>
        )
    }
}