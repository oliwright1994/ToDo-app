import PropTypes from "prop-types";
import React, { Component } from "react";

const Todo = ({ item, handleComplete, removeTodo }) => (
  <li className={`todo-item ${item._id}`}>
    {item.title}
    <input
      type="checkbox"
      id={item._id}
      checked={item.complete}
      onChange={event => handleComplete(item._id, event.target.checked)}
    />
    <label htmlFor={item._id} />
    <button onClick={event => removeTodo(item._id)}>
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
