import React from "react";

export default class PostMenu extends React.Component {
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

    datalist = datalist.filter(function (item) {
      return item.name !== user;
    });

    return (
      <form>
        <div>
          <select onChange={this.onChange}>
            <option selected key={datalist[0].name} value={datalist[0].name}>
              {datalist[0].name}
            </option>
            <option key={datalist[1].name} value={datalist[1].name}>
              {datalist[1].name}
            </option>
            <option key={datalist[2].name} value={datalist[2].name}>
              {datalist[2].name}
            </option>
          </select>
        </div>
      </form>
    );
  }
}
