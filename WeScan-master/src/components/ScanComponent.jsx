import React, { Component } from "react";
import {Jumbotron} from 'reactstrap'
import QrReader from "react-qr-reader";

class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 300,
            result: "No result"
        };
        this.handleScan = this.handleScan.bind(this);
    }
    handleScan(data) {
        if (data) {
            this.setState({
                result: data
            });
        }
    }
    handleError(err) {
        console.error(err);
    }
    render() {
        return (

           
            <div>
                <Jumbotron>
         <center> <h1>Scan QR code to enter/leave the place</h1></center>
                </Jumbotron>
                <QrReader
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: "100%" }}
                />
                <p>{this.state.result}</p>
            </div>
        );
    }
}

export default Scan;