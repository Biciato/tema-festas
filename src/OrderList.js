import React from 'react';
import './OrderList.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function OrderList(props) {
    const product = props.productList;
    return(
        <Row bsPrefix="m-1">
            <Col bsPrefix="p-2 bg-info text-light rounded-left">
                <label>Produto:<span>{product.product}</span></label>
                <label>Tamanho:<span>{product.size}</span></label>
                <label>Cor:<span>{product.color}</span></label>
                <label>Tema:<span>{product.theme}</span></label>
                <label>Número:<span>{product.number}</span></label>
                <label>Quantidade:<span>{product.qty}</span></label>
                <label>Total:<span>25,00</span></label>
            </Col>
        </Row>
    );
}

export default OrderList;