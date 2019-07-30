import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";
import Todo from "../../components/ToDo";
import ToDoCount from "../../components/ToDoCount";
import ClearButton from "../../components/ClearButton";
import Header from "../../components/Header";
import { ToDos } from "../../../api/todo";

import { withTracker } from "meteor/react-meteor-data";

//Start of App component
class App extends Component {
  constructor(props) {
    super(props);
    this.toDoInput = React.createRef();
  }

  handleComplete = id => {
    const todos = this.props.todos.map(todo => {
      if (todo._id === id) {
        todo.complete = !todo.complete;
      }
      return todo;
    });

    this.setState({ todos });
  };

  removeTodo = id => {
    const todos = this.props.todos.filter(todo => {
      return todo._id !== id;
    });
    this.setState({ todos });
  };

  clearCompleted = () => {
    const todos = this.props.todos.filter(todo => !todo.complete);
    this.setState({ todos });
  };

  addToDo = event => {
    event.preventDefault();
    let toDoInput = this.toDoInput.current;
    if (toDoInput.value) {
      const newTodos = [
        ...this.state.todos,
        { title: toDoInput.value, complete: false }
      ];
      this.setState({
        todos: newTodos
      });
      toDoInput.value = "";
    }
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
