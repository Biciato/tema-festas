import React from 'react';
import './App.css';
import ProductSelect from './ProductSelect';
import SizeSelect from './SizeSelect';
import ColorSelect from './ColorSelect';
import ThemeSelect from './ThemeSelect';
import NumberSelect from './NumberSelect';
import AddButton from './AddButton';
import OrderList from './OrderList';
import Container from 'react-bootstrap/Container';
import QuantitySelect from './QuantitySelect';
import Product from './models/Product';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleThemeChange = this.handleThemeChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleAddBtnClick = this.handleAddBtnClick.bind(this);
        this.handleQtyChange = this.handleQtyChange.bind(this);
        this.state = {
            product: {value:null},
            size: {value:null},
            number: {value:null},
            theme: {value:null},
            color: {value:null},
            qty: null,
            productList: []
        };
    }

    handleProductChange(product) {
        this.setState({product});
    }
    handleSizeChange(size) {
        this.setState({size});
    }
    handleNumberChange(number) {
        this.setState({number});
    }
    handleThemeChange(theme) {
        this.setState({theme});
    }
    handleColorChange(color) {
        this.setState({color});
    }
    handleQtyChange(qty) {
        this.setState({qty});
    }

    handleAddBtnClick() {
        let productList = this.state.productList;
        const product = new Product(
            this.state.product.value,
            this.state.size.value,
            this.state.qty,
            this.state.color.value,
            this.state.theme.value,
            this.state.number.value
        )
        productList.push(product);
        this.setState({ productList: productList});
    }
    render() {
        const product = this.state.product;
        const prodList = this.state.productList.map((item, index) => 
            <OrderList key={index} productList={item}/>
        );
        return (
            <Container id="App" fluid="true">
                <ProductSelect onProductChange={this.handleProductChange}/>
                <SizeSelect product={product} onSizeChange={this.handleSizeChange}/>
                <ColorSelect product={product} onColorChange={this.handleColorChange}/>
                <ThemeSelect product={product} onThemeChange={this.handleThemeChange}/>
                <NumberSelect product={product} onNumberChange={this.handleNumberChange}/>
                <QuantitySelect product={product} onQtyChange={this.handleQtyChange}/>
                <AddButton product={product} onAddBtnClick={this.handleAddBtnClick}/>
                {prodList}
                <Row bsPrefix="row m-1">
                    <Col>
                        <h5>Total Pedido: <span>{prodList.length < 1 ? '0,00' : '100,00'}</span></h5>
                    </Col>
                </Row>                
            </Container>
        )
    }
}

export default App;
