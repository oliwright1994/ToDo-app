import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";
import Todo from "../../components/ToDo";
import ToDoCount from "../../components/ToDoCount";
import ClearButton from "../../components/ClearButton";
import Header from "../../components/Header";

//Start of App component
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: 0, title: "Learn React", complete: false },
        { id: 1, title: "Learn Redux", complete: true },
        { id: 2, title: "Learn Meteor", complete: false },
        { id: 3, title: "Learn React Native", complete: false }
      ]
    };
    this.toDoInput = React.createRef();
  }

  handleComplete = id => {
    const todos = this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
      }
      return todo;
    });

    this.setState({ todos });
  };

  removeTodo = id => {
    const todos = this.state.todos.filter(todo => {
      return todo.id !== id;
    });
    this.setState({ todos });
  };

  clearCompleted = () => {
    const todos = this.state.todos.filter(todo => !todo.complete);
    this.setState({ todos });
  };

  addToDo = event => {
    event.preventDefault();
    let toDoInput = this.toDoInput.current;
    if (toDoInput.value) {
      const id = this.state.todos.length + 1; // update id
      const newTodos = [
        ...this.state.todos,
        { id, title: toDoInput.value, complete: false }
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
    let numberCompleted = this.state.todos.filter(todo => {
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
            {this.state.todos.map(todo => (
              <Todo
                item={todo}
                key={todo.id}
                handleComplete={this.handleComplete}
                removeTodo={this.removeTodo}
              />
            ))}
          </ul>
          <div className="todo-admin">
            <ToDoCount number={this.state.todos.length - numberCompleted} />
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
