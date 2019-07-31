import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";
import Todo from "../../components/ToDo";
import ToDoCount from "../../components/ToDoCount";
import ClearButton from "../../components/ClearButton";
import Header from "../../components/Header";
import { ToDos } from "../../../api/todos";

import { withTracker } from "meteor/react-meteor-data";

//Start of App component
class App extends Component {
  constructor(props) {
    super(props);
    this.toDoInput = React.createRef();
  }

  handleComplete = (id, checked) => {
    ToDos.update({ _id: id }, { $set: { complete: !!checked } });
  };

  removeTodo = id => {
    ToDos.remove({ _id: id });
  };

  clearCompleted = () => {
    const completed = ToDos.find({ complete: true });
    completed.forEach(todo => ToDos.remove({ _id: todo._id }));

    ToDos.remove({ complete: true });
  };

  addToDo = event => {
    event.preventDefault();
    let toDoInput = this.toDoInput.current;
    ToDos.insert({
      title: toDoInput.value,
      complete: false
    });
    toDoInput.value = "";
  };

  componentDidMount() {
    this.toDoInput.current.focus();
  }

  render() {
    let numberCompleted = this.props.todos.filter(todo => {
      return todo.complete === true;
    }).length;

    return (
      <div>
        <div className="todo-list">
          <Header />
          <div className="add-todo">
            <form name="addTodo" onSubmit={this.addToDo}>
              <input type="text" ref={this.toDoInput} />
              <span>(press enter to add)</span>
            </form>
          </div>
          <ul>
            {this.props.todos.map(todo => (
              <Todo
                item={todo}
                key={todo._id}
                handleComplete={this.handleComplete}
                removeTodo={this.removeTodo}
              />
            ))}
          </ul>
          <div className="todo-admin">
            <ToDoCount number={this.props.todos.length - numberCompleted} />
            {numberCompleted > 0 ? (
              <ClearButton
                clearCompleted={this.clearCompleted}
                numberCompleted={numberCompleted}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  todos: PropTypes.array.isRequired
};
App.defaultTypes = {
  todos: []
};

export default withTracker(() => {
  return {
    todos: ToDos.find({}).fetch()
  };
})(App);
