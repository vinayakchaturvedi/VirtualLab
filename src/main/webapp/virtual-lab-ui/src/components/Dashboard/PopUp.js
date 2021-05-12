import React, {Component} from "react";

export default class PopUp extends Component {
    handleClick = () => {
        this.props.toggle();
    };

    render() {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                marginBottom: "2%"
            }}>
                <div style={{
                    backgroundColor: "rgba(223,12,12,0.25)",
                    width: "20%",
                    height: "20%"
                }}>
                    <span className="close" onClick={this.handleClick}>&times;    </span>
                    <p style={{fontColor: "rgb(1,1,1)", fontWeight: "bold"}}>{this.props.message}</p>
                </div>
            </div>
        );
    }
}