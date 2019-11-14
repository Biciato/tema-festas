import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ClientSelect from './ClientSelect'
import './ClientComponent.css'

export default class ClientComponent extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.handleClientSelect = this.handleClientSelect.bind(this)
        this.state = {client: null}
    }
    handleClientSelect(client) {
        this.setState({client})
    }
    handleClick() {
        if (this.state.client !== null) {
            this.props.onMakeOrderClick()
        }
    }
    render() {
        return(
            <Row bsPrefix="row m-1">
                <Col>
                    <h5 className="text-left mt-3">Clientes</h5>
                    <ClientSelect onClientSelect={this.handleClientSelect}/>
                    <div className="footer" onClick={this.handleClick}>
                        Fazer Pedido
                    </div>
                </Col>
            </Row>
        )
    }
}