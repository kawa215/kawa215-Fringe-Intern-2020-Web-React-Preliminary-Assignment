import React from "react";
import Menu from "./Menu";
// import Ito from '../../../image/ito.png';

export default class User extends React.Component {
  constructor() {
    super();
    this.state = {
      currentName: "tanaka",
      receivepoint: null,
      givepoint: null,
    };
  }
  changeUser(name) {
    this.props.changeUser(name);
    this.setState({ currentName: name });
  }

  render() {
    var datalist = JSON.parse(localStorage.getItem("datalist"));
    var user = datalist.find((item) => item.name === this.state.currentName);

    this.state.givepoint = user["givepoint"];
    this.state.receivepoint = user["receivepoint"];
 
    if (this.props.flagPoint == true) {

    }
    return (
      <div>
        <div>
          <img src={"../../../image/" + this.state.currentName + ".png"} />
        </div>
        <Menu
          excludeFlag={this.props.excludeFlag.bind(this)}
          currentName={this.state.currentName}
          changeName={this.changeUser.bind(this)}
        />
        <p>拍手できる:{this.state.givepoint}</p>
        <p>受け取ったポイント:{this.state.receivepoint}</p>
      </div>
    );
  }
}
