import React from 'react';
import './App.css';
import Product from './Product';
import Size from './Size';
import Color from './Color';
import Theme from './Theme';
import Number from './Number';
import Container from 'react-bootstrap/Container';

function App() {
    return (
        <Container id="App" fluid="true">
            <Product />
            <hr></hr>
            <Size />
            <hr></hr>
            <Color />
            <hr></hr>
            <Theme />
            <hr></hr>
            <Number />
        </Container>
    );
}

export default App;
