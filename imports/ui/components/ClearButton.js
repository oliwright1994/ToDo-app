import React, { Component } from "react";

const ClearButton = ({ clearCompleted }) => (
  <button onClick={() => clearCompleted()}>Clear Completed</button>
);

export default ClearButton;
