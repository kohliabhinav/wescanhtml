import React, { Component } from "react";

class Seeyou extends Component {
    render() {
        return (
            <div style={{ paddingTop: "50px" }}>
                <center><img src="./assets/images/SeeYou.svg" alt="seeyou" style={{ width: "405px", height: "240px" }} /></center>
                <div><br/>
                    <center><h1>See you again!</h1></center>
                    <center><p style={{ width: "298px", height: "19px", fontFamily: "Roboto", textColor: "B8BBC6" }}>Thank You for your cooperation</p></center>
                    <br /><br /><br />
                    <center><p style={{ width: "375px", height: "56px", fontFamily: "Roboto", textColor: "B8BBC6" }}>Download our App to save time on your next visit </p></center>

                </div>
                <center><button style={{ backgroundColor: "Yellow"}}>
                    <p style={{ width: "390px", height: "30px", fontFamily: "Roboto", textColor: "B8BBC6" }}> Download App </p>
                </button></center>
            </div>
        );
    }
}
export default Seeyou;