import React, { Component } from "react";

const Header = ({ title }) => <h1> {title}</h1>;

Header.defaultProps = {
  title: "So Much To DO!"
};

export default Header;
