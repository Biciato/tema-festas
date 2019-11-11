import React from 'react'
import axios from 'axios'
import './Login.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const inputStyle = {
    background: '#FFFFFF',
    border: '1px solid #D7D7D7',
    width: '100%',
    padding: '0.5em',
    webkitBorderRadius: 0,
        mozBorderRadius: 0,
            borderRadius: 0
}

export default class Login extends React.Component { 
    constructor(props) {
        super(props)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            email: '',
            password: ''
        }
    }
    handleEmailChange(event) {
        this.setState(Object.assign({}, this.state, {
            email: event.target.value
        }))
    }
    handlePasswordChange(event) {
        this.setState(Object.assign({}, this.state, {
            password: event.target.value
        }))
    }
    handleSubmit() {
        window.history.pushState(null, null, '/home')
    }
    render() {
        return(
            <Container fluid={true}>
                <Row>
                    <Col style={{marginTop: '30%'}}>
                        <h5 style={{color: '#32338D'}}>Login</h5>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="loginUser">
                                <Form.Control 
                                    type="email" 
                                    placeholder="Usuário" 
                                    style={inputStyle}
                                    onChange={this.handleEmailChange}/>
                            </Form.Group>    
                            <Form.Group controlId="loginPass">
                                <Form.Control 
                                    type="password" 
                                    placeholder="Senha"  
                                    style={inputStyle}
                                    onChange={this.handlePasswordChange}/>
                            </Form.Group>
                            <Button style={{backgroundColor: '#32338D'}} type="submit">
                                Entrar
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        ) 
    }
}