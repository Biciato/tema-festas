import React from 'react';
import Themes from './resources/themes';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';

class ThemeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(theme) {
        this.props.onThemeChange(theme);
    }
    render() {
        if (!this.props.product.value){return null;}
        let themeList = []; 
        Themes.map((item) => themeList.push({value: item, label: item}));
        return (
            <Row bsPrefix="row m-1">
                <Col>
                    <label className="label bg-primary">Tema</label>
                    <Select options={themeList} onChange={this.handleChange}/>
                </Col>
            </Row>
        );
    }   
}
export default ThemeSelect;