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

function Size(props) {
    if (props.product.value === 'saia') {
        return null;
    }
    let sizeList = []; 
    Sizes.map((item) =>
        sizeList.push({value: item, label: item})
    );
    return (
        <Row bsPrefix="row m-1">
            <Col>
                <label className="label bg-danger">Tamanho</label>
                <Select options={sizeList}/>
            </Col>
        </Row>
    );
}

export default Size;