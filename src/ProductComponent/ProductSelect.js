import React from 'react';
import Products from '../resources/products';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';

const e = React.createElement

class ProductSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(product) {
        this.props.onProductChange(product);
    }
    render() {
        let prodList = [];
        Products.map((item) => prodList.push({value: item, label: item}));
        return (
            e(Row, { bsPrefix: 'row m-1'},
              e(Col,null,
                [
                  e(Label,{className:'label bg-success'},'Produto'),
                  e(Select,[{options:prodList},{onChange:this.handleChange}])
                ]
        )));
    }
}
export default ProductSelect;
