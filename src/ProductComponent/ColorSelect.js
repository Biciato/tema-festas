import React from 'react';
import './ColorSelect.css';
import ColorList from './ColorList';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ColorSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleColorClicked = this.handleColorClicked.bind(this);
        this.selectColorType = this.selectColorType.bind(this);
        this.state = { type: 'poa' };
    }

    handleChange(color) {
        this.props.onColorChange(color);
    }
    handleColorClicked(color) {
        this.handleChange(color);
    }
    selectColorType(type) {
        this.setState({type});
    }

    render() {
        if (!this.props.product.value){return null;}
        const type = this.state.type;
        return (
            <Row bsPrefix="row m-1">
                <Col bsPrefix="col-sm">
                    <label className="label">Tipo da cor</label>
                    <Button 
                        bsPrefix={'btn btn-outline-info btn-md m-1'}
                        onClick={()=> this.selectColorType('poa')}
                        className={this.state.type === 'poa' ? 'active' : ''}>
                            POA
                    </Button>
                    <Button 
                        bsPrefix={'btn btn-outline-info btn-md m-1'}
                        onClick={()=> this.selectColorType('liso')}
                        className={this.state.type === 'liso' ? 'active' : ''}>
                            LISO
                    </Button>
                    <label className="label">Cores</label>
                    <ColorList color={type} onColorClicked={this.handleColorClicked}/>
                </Col>
            </Row>
        );
    }
}

export default ColorSelect;