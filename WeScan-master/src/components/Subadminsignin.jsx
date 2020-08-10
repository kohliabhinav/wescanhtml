import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap'
import { Control, Form, Errors } from 'react-redux-form'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)
const isNumber = (val) => !isNaN(Number(val))


class Subadminsignin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            input: {},
            errors: {}
        };
    }

    render() {
        return (
            <div className="container" style={{
                padding: "50px"
            }}>
                <div className="row">
                    <img src="./assets/images/Welcome.svg" alt="welcome" style={{ width: "320px", height: "246px", marginLeft: '3px', leftMargin: '100px' }} />

                    <div className="col-12">
                        <h1 style={{ fontFamily: "Roboto", fontSize: "28", width: "174", height: "37", letterSpacing: "38" }}> Please Enter</h1>
                    </div>
                </div>


                <div className="row row-content">
                    <div className="col-12 col-md-9">
                        <Form>
                            <Row className="form-group">

                                <Col md={10}>
                                    <Control.text model=".fullname" id="fullname" name="fullname" style={{ width: "260px", height: "56px", fontFamily: "Roboto", fontSize: "16", borderRadius: "6px" }}
                                        placeholder="Full Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".fullname"
                                        show="touched"
                                        messages={{
                                            required: 'Required  ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={10}>
                                    <Control.text
                                        id="telnum"
                                        name="telnum" style={{ width: "260px", height: "56px", borderRadius: "6px", fontFamily: "Roboto", fontSize: "16" }}
                                        model=".telnum"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(7), maxLength: maxLength(10), isNumber
                                        }}
                                        placeholder="Mobile Number"
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Mush be greater than 7 numberss',
                                            maxLength: 'Must be 10 numberss or less',
                                            isNumber: 'Must be a number'
                                        }}
                                    />
                                </Col>
                            </Row><br />
                            <Row className="form-group">
                                <Button type="submit" color="secondary" style={{ borderRadius: '100px', height: '56px', width: '290px' }}>
                                    Done
                            </Button>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Subadminsignin;
