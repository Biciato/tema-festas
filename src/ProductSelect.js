import React from 'react';
import Products from './resources/products';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';

class ProductSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(product) {
        this.props.onProductChange(product);
    }
    render() {
        let prodList = []; 
        Products.map((item) => prodList.push({value: item, label: item}));
        return (
            <Row bsPrefix="row m-1">
                <Col>
                    <label className="label bg-success">Produto</label>
                    <Select options={prodList} onChange={this.handleChange}/>
                </Col>
            </Row>
        );
    }
}

export default ProductSelect;
