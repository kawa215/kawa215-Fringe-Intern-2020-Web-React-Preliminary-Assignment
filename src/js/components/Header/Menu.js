import React from "react";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usstate: props.initState,
      desc: "This is for a text area.",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onTextAreaChange = this.onTextAreaChange.bind(this);
  }

  onChange(e) {
    this.props.changeName(e.target.value);
    this.props.excludeFlag(true);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onTextAreaChange(e) {
    this.setState({ desc: e.target.value });
  }

  render() {
    var datalist = JSON.parse(localStorage.getItem("datalist"));
    var user = JSON.parse(localStorage.getItem("user"));

    if (this.props.flag) {
      datalist = datalist.filter(function (item) {
        return item.name !== user;
      });
    }

    var options = datalist.map((data) => (
      <option key={data.name} value={data.name}>
        {data.name}
      </option>
    ));

    return (
      <form>
        <div>
          <select value={this.state.usstate} onChange={this.onChange}>
            {options}
          </select>
        </div>
      </form>
    );
  }
}
