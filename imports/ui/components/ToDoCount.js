import PropTypes from "prop-types";
import React, { Component } from "react";

const ToDoCount = ({ number }) => (
  <p>{number < 1 ? "Nothing left todo!" : `${number} Things todo`}</p>
);

ToDoCount.propTypes = {
  number: PropTypes.number
};

export default ToDoCount;
