import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class QuantitySelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.props.onQtyChange(event.target.value);
    }
    render() {
        if (!this.props.product.value){return null;}
        return(
            <Row bsPrefix="row m-1">
                <Col bsPrefix="col text-center">
                    <label className="label bg-secondary">Quantidade</label>
                    <input type="number" onChange={this.handleChange}></input>
                </Col>
            </Row>
        );
    }
}

export default QuantitySelect;