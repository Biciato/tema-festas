import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';

const Sizes = [
    'surpresa',
    'micro',
    'mini',
    'pequeno',
    'médio',
    'grande',
]

class SizeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(size) {
        this.props.onSizeChange(size);
    }
    render() {
        if (!this.props.product.value){return null;}
        let sizeList = []; 
        Sizes.map((item) => sizeList.push({value: item, label: item}));
        return (
            <Row bsPrefix="row m-1">
                <Col>
                    <label className="label bg-danger">Tamanho</label>
                    <Select options={sizeList} onChange={this.handleChange}/>
                </Col>
            </Row>
        );
    }
}

export default SizeSelect;