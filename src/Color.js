import React from 'react';
import './Color.css';
import { default as Colors } from './resources/colors';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';

function ColorList(props) {
    let colorList = []; 
    Colors.default.concat(Colors[props.color]).map((item) =>
        colorList.push({value: item, label: item})
    );
    return (<Select options={colorList} className="m-1"/>);
}

class Color extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { color: 'poa' };
    }

    handleChange(color) {
        this.setState({color: color});
    }

    render() {
        const color = this.state.color;
        return (
            <Row bsPrefix="row m-1">
                <Col bsPrefix="col-sm">
                    <label className="label">Tipo da cor</label>
                    <Button 
                        bsPrefix={'btn btn-outline-info btn-md m-1'}
                        onClick={()=> this.handleChange('poa')}
                        className={this.state.color === 'poa' ? 'active' : ''}>
                            POA
                    </Button>
                    <Button 
                        bsPrefix={'btn btn-outline-info btn-md m-1'}
                        onClick={()=> this.handleChange('liso')}
                        className={this.state.color === 'liso' ? 'active' : ''}>
                            LISO
                    </Button>
                    <label className="label">Cores</label>
                    <ColorList color={color}/>
                </Col>
            </Row>
        );
    }
}

export default Color;