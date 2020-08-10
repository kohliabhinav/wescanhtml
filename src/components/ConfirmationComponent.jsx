import React, { Component } from "react";

class Confirm extends Component {
    render() {
        return (
            <div>
                <center><img src="./assets/images/Awesome.svg" alt="awesome" style={{ width: "380px", height: "246px" }}/></center>
                <div>
                    <center><h1>Awesome!</h1></center>
                    <center><p style={{ width: "188px", height: "24px", fontFamily: "Roboto", textColor: "B8BBC6" }}>You Gained the pass</p></center >
                    <center><p style={{ width: "298px", height: "19px", fontFamily: "Roboto", textColor: "B8BBC6" }}>Please show the screen in check-in point</p></center>
                    <br/><br/><br/>
                        <center><p style={{ width: "375px", height: "56px", fontFamily: "Roboto", textColor: "B8BBC6" }}>Download our App to save time on your next visit </p></center>

                </div>
                <center><button type="submit" href="./Seeyou" style={{ backgroundColor: "Yellow" }}>
                    <center><p style={{ width: "400px", height: "40px", fontFamily: "Roboto", textColor: "B8BBC6" }}> Download App </p></center>
                    </button></center>
            </div>
        );
    }
}
export default Confirm;