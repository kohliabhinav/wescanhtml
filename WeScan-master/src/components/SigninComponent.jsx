import React, { Component } from 'react';
import { baseUrl } from '../shared/baseUrl'
import firebase from "../firebase"
import { Redirect } from "react-router-dom"




class Signin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            input: {},
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }



    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.validate()) {
            event.preventDefault();
            window.appVerifier = new firebase.auth.RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible"
                }
            );
            const appVerifier = window.appVerifier;

            this.login(appVerifier, this.state.input.phone)
        }
    }


    login(appVerifier, value) {

        var self = this;

        fetch(baseUrl + '/user/login/' + value,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },

            }).then(response => {
                if (response.ok) {
                    var token = response.token
                    localStorage.setItem('token', token);
                    localStorage.setItem('phoneNNumber', self.state.input.phone)
                    self.setState({ redirect: '/confirm' })
                }
                else {
                    if (response.status === 422) { this.sendOtp(appVerifier, value) }
                    else { alert(response.statusText) }
                }
            }, error => {
                alert(error.message)
            })

            .catch(error => {
                console.log('Post comments ', error.message);
                alert('Unable to Login. Please try again!')
            });


    }


    sendOtp(appVerifier, number) {
        const phoneNumber = "+91" + number;
        var self = this;
        //const state = this.state
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                console.log('otp sent ' + confirmationResult)

                window.confirmationResult = confirmationResult
                self.setState({ redirect: '/verify' });



            }).catch(function (error) {
                console.log('error' + error)
            });
    }



    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["name"]) {
            isValid = false;
            errors["name"] = "Please enter your name.";
        }


        if (!input["phone"]) {
            isValid = false;
            errors["phone"] = "Please enter your phone number.";
        }
        if (typeof input["phone"] !== "undefined") {

            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(input["phone"])) {
                isValid = false;
                errors["phone"] = "Please enter only number.";
            } else if (input["phone"].length !== 10) {
                isValid = false;
                errors["phone"] = "Please enter valid phone number.";
            }
        }



        return isValid;
    }


    render() {
        if (this.state.redirect) {
            var name = this.state.input.name;
            var phone = this.state.input.phone;
            let input = {};
            input["name"] = "";
            input["phone"] = "";
            this.setState({ input: input });
            return <Redirect to={{
                pathname: this.state.redirect,
                state: { name: name, phone: phone }
            }} />

        } else {
            return (
                <center> <div className="container" style={{
                    padding: "50px"
                }}><br /><br />



                    <h2 style={{ fontFamily: "Roboto", fontWeight: 900, fontSize: "28", letterSpacing: "20", marginLeft: "20px", textDecorationColor: "#010526" }}>Login</h2 ><br /><br />

                    <form onSubmit={this.handleSubmit}>


                        <div class="form-group has-feedback">


                            <input style={{
                                width: "290px", height: "56px", fontFamily: "Roboto", fontSize: "16", borderRadius: "6px"
                            }}
                                type="text"
                                name="name"
                                value={this.state.input.name}
                                onChange={this.handleChange}
                                class="form-control"
                                placeholder="Full Name"
                                id="name"
                            />

                            <div className="text-danger">{this.state.errors.name}</div>

                        </div><br />



                        <div class="form-group">

                            <input style={{
                                width: "290px", height: "56px", borderRadius: "6px", fontFamily: "Roboto", fontSize: "16"
                            }}
                                type="text"
                                name="phone"
                                value={this.state.input.phone}
                                onChange={this.handleChange}
                                class="form-control"
                                placeholder="Mobile Number"
                                id="number" />

                            <div className="text-danger">{this.state.errors.phone}</div>
                        </div><br />

                        {/* <div id ="" style={{marginBottom: '40px' }}></div> */}
                        <input type="submit" href="./Confirm" value="Submit" style={{ borderRadius: '50px', height: '56px', width: '290px', marginLeft: "20px", textDecorationColor:'#010526',backgroundColor: "#FFF800"}} class="btn btn-success" id="recaptcha-container" />

                    </form>

        

                </div></center>




            );

        }
    }


    getReCaptchaVerifier() {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': function (response) {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                console.log('callback called')
            }
        });
        console.log('recaptcha');
        window.recaptchaVerifier.render().then(function (widgetId) {
            window.recaptchaWidgetId = widgetId;
            console.log('widgetId ' + widgetId)
        });

    }
}

export default Signin;