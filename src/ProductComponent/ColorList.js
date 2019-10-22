import React from 'react';
import Colors from './resources/colors';
import Select from 'react-select';

class ColorList extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(color) {
        this.props.onColorClicked(color);
    }
    render () {
        let colorList = []; 
        Colors.default.concat(Colors[this.props.color]).map((item) =>
            colorList.push({value: item, label: item})
        );
        return (<Select options={colorList} className="m-1" onChange={this.handleChange}/>);
    }
}

export default ColorList;