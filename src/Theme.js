import React from 'react';
import { default as Themes } from './resources/themes';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';

function Theme() {
    let themeList = []; 
    Themes.map((item) => themeList.push({value: item, label: item}));
    return (
        <Row bsPrefix="row m-1">
            <Col>
                <label className="label bg-primary">Tema</label>
                <Select options={themeList}/>
            </Col>
        </Row>
    );
}
export default Theme;