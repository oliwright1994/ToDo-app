import PropTypes from "prop-types";
import React, { Component } from "react";

const Todo = ({ item, handleComplete, removeTodo }) => (
  <li className={`todo-item ${item.id}`}>
    {item.title}
    <input
      type="checkbox"
      id={item.id}
      checked={item.complete}
      onChange={event => handleComplete(item.id)}
    />
    <label htmlFor={item.id} />
    <button onClick={event => removeTodo(item.id)}>
      <i className="fa fa-trash" />
    </button>
  </li>
);

Todo.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number,
    complete: PropTypes.bool
  })
};

export default Todo;
