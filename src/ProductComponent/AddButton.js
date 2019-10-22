import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class AddButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange() {
        this.props.onAddBtnClick('clicked');
    }
    render() {
        if (!this.props.product.value){return null;}
        return(
            < Row bsPrefix="row m-1">
                <Col bsPrefix="col text-center">
                    <Button onClick={this.handleChange}>Incluir</Button>
                </Col>
            </Row>
        );
    }
}

export default AddButton;