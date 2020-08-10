import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import { Button, Row } from 'reactstrap'
import { baseUrl } from '../shared/baseUrl'
import { Redirect } from "react-router-dom"
import '../App.css'


class Verify extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            otp: '',
            redirect: null

        };
        console.log(this.props.location.state.phone)


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }


    handleSubmit(event) {
        event.preventDefault();

        this.verifyOtp();

    }

    verifyOtp() {
        const code = this.state.otp
        var self = this;

        window.confirmationResult.confirm(code).then(function (result) {
            self.signupUser();
        }).catch(function (error) {
            alert(error);
        });
    }


    signupUser() {
        var self = this;
        var postData = {
            "name": this.props.location.state.name,
            "phoneNumber": this.props.location.state.phone,
            "userType": "General"
        }
        fetch(baseUrl + '/user/register',
            {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json'
                },

            }).then(response => {
                if (response.ok) {
                    var token = response.token
                    console.log('token ' + token);
                    localStorage.setItem('token', token);
                    localStorage.setItem('phoneNNumber',self.props.location.state.phone)
                    self.setState({ redirect: '/confirm' })
                  
                }
                else {
                    alert(response.statusText)
                }
            }, error => {
                alert(error.message)
            })

            .catch(error => {
                console.log('Post comments ', error.message);
                alert('Unable to Signup. Please try again!')
            });
    }



    handleChange = otp => this.setState({ otp });

    render() {
        if (this.state.redirect) {
           
            this.setState({ otp: '', phone: '',name : '' });
            return <Redirect to={{
                pathname: this.state.redirect,
               
            }} />

        } else {
            return (
                <div className="container" style={{
                    padding: "50px"
                }}><br /><br />
                    <div className="row">
                        <div className="col-12">
                            <h2 style={{ fontFamily: "Roboto", fontSize: "28", width: "174", height: "37", letterSpacing: "38", textDecorationColor: 'black', fontWeight: "100px" }}> Verify your Phone</h2>
                        </div>
                    </div>
                    <div><br /><br />
                        <form onSubmit={this.handleSubmit}>
                            <p style={{ fontFamily: "Roboto", fontSize: "16", width: "190", height: "21", letterSpacing: "38", textDecorationColor: 'black' }}>Code sent to {this.props.location.state.phone}</p>
                            <div style={{ width: "296", height: "56", fontSize: '2rem' }}>
                                <OtpInput id="VerificationCode" style={{ width: "296", height: "56", fontSize: "16" }}
                                    value={this.state.otp}
                                    onChange={this.handleChange}
                                    numInputs={6}
                                    isInputNum={true}
                                    inputStyle="inputStyle"
                                    shouldAutoFocus={true}

                                    separator={<span>-</span>}
                                />
                            </div><br /><br />


                            <a href="#" style={{ fontFamily: "Roboto", fontSize: "16", width: "88", height: "21", letterSpacing: "38" }}>Resend OTP</a><br /><br />
                            <div><br />

                                <Row className="form-group">

                                    <Button type="submit" color="secondary" style={{ marginLeft: "10px", borderRadius: '100px', width: '285px', height: '56px' }}>
                                        VERIFY
                            </Button>



                                </Row>
                            </div>
                        </form>
                    </div>

                </div>



            );
        }
    }
}

export default Verify;
