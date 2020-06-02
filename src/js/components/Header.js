import React from "react";
import User from "./Header/User";

export default class Header extends React.Component {
  handleChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }
  changeUser(user) {
    this.props.changeUser(user);
  }
  render() {
    return (
      <div className="Header">
        <User
          excludeFlag={this.props.excludeFlag.bind(this)}
          changeUser={this.props.changeUser.bind(this)}
          flagPoint={this.props.flagPoint}
        />
      </div>
    );
  }
}
