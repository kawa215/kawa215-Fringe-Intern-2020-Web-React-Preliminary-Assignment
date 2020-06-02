import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout";

if(JSON.parse(localStorage.getItem("datalist")) == undefined) {
    var datalist = [
        { name: "tanaka", givepoint: 100, receivepoint: 0 },
        { name: "ito", givepoint: 100, receivepoint: 0 },
        { name: "miura", givepoint: 100, receivepoint: 0},
        { name: "suzuki", givepoint: 100, receivepoint: 0},
      ];
      localStorage.setItem("datalist", JSON.stringify(datalist));
}

const app = document.getElementById("app");
ReactDOM.render(<Layout />, app);
