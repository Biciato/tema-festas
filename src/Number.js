import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';

function Theme() {
    let numberList = []; 
    [...Array(10).keys()].map((item) =>
        numberList.push({value: item, label: item})
    );
    return (
        <Row bsPrefix="row m-1">
            <Col>
                <label className="label bg-secondary">Número</label>
                <Select options={numberList}/>
            </Col>
        </Row>
    );
}
export default Theme;