import React from 'react';
import './App.css';
import Product from './Product';
import Size from './Size';
import Color from './Color';
import Theme from './Theme';
import Number from './Number';
import Container from 'react-bootstrap/Container';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.handleProductChange = this.handleProductChange.bind(this);
        this.state = {product: ''};
    }

    handleProductChange(product) {
        this.setState({product});
    }
    render() {
        const product = this.state.product;
        return (
            <Container id="App" fluid="true">
                <Product product={''}
                         onProductChange={this.handleProductChange}/>
                <hr></hr>
                <Size product={product}/>
                <hr></hr>
                <Color />
                <hr></hr>
                <Theme />
                <hr></hr>
                <Number />
            </Container>
        )
    }
}

export default App;
