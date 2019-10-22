import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';

class NumberSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(number) {
        this.props.onNumberChange(number);
    }
    render() {
        if (!this.props.product.value){return null;}
        let numberList = []; 
        [...Array(10).keys()].map((item) => numberList.push({value: item, label: item}));
        return (
            <Row bsPrefix="row m-1">
                <Col>
                    <label className="label bg-secondary">Número</label>
                    <Select options={numberList} onChange={this.handleChange}/>
                </Col>
            </Row>
        )
    }
}

export default NumberSelect;