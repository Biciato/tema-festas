import React from 'react'
import Badge from 'react-bootstrap/Badge';
import './TotalComponent.css';

export default class TotalComponent extends React.Component {
    render() {
        return(
            <div className="footer">
                <h6 className="bg-danger text-light p-1 text-right">
                    TOTAL: <Badge variant="danger">R$ 100,00</Badge>
                </h6>
            </div>
        );
    }
}