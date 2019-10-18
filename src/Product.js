import React from 'react';
import { default as Products } from './resources/products';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';

function Product() {
    let prodList = []; 
    Products.map((item) =>
        prodList.push({value: item, label: item})
    );
    return (
        <Row bsPrefix="row m-1">
            <Col>
                <label className="label bg-success">Produto</label>
                <Select options={prodList}/>
            </Col>
        </Row>
    );
}

export default Product;
