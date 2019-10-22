import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';

const Sizes = [
    'surpresa',
    'mini',
    'grande',
]

function TypeList(props) {
    const size = props.size;
    return(
        <Row bsPrefix="row m-1">
            <Col>
                <label className="label bg-danger">{size}</label>
                <Select />
                <div>

                </div>
            </Col>
        </Row>
    );
}

export default class SizeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(size) {
        this.props.onSizeChange(size);
    }
    render() {
        if (!this.props.product.value){return null;}
        const sizeBoxes = Sizes.map((item) => <TypeList size={item}/>);
        return ({sizeBoxes});
    }
}

