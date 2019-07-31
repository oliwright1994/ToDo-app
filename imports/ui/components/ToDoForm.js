import React, { Component } from "react";
import PropTypes from "prop-types";
import Todo from "./ToDo";
import ToDoCount from "./ToDoCount";
import AddToDo from "./AddToDo";
import ClearButton from "./ClearButton";
import Header from "./Header";
import { ToDos } from "../../api/todos";
import AccountsUIWrapper from "./AccountsUIWrapper";
import { withTracker } from "meteor/react-meteor-data";
import "../../start-up/accounts-config";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

//Start of App component
class ToDoForm extends Component {
  constructor(props) {
    super(props);
    this.toDoInput = React.createRef();
  }

  handleComplete = todo => {
    Meteor.call("todos.toggleComplete", todo, this.props.user);
  };

  removeTodo = todo => {
    Meteor.call("todos.removeTodo", todo, this.props.user);
  };

  clearCompleted = () => {
    Meteor.call("todos.clearCompleted", this.props.user);
  };

  addToDo = event => {
    event.preventDefault();
    let toDoInput = this.toDoInput.current;
    if (!!toDoInput.value) {
      Meteor.call("todos.addToDo", toDoInput.value, this.props.user);
    }
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
        <AddToDo focusTarget={this.toDoInput} addToDo={this.addToDo} />
        <ul>
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {this.props.todos.map(todo => (
              <Todo
                item={todo}
                key={todo._id}
                handleComplete={this.handleComplete}
                removeTodo={this.removeTodo}
              />
            ))}
          </ReactCSSTransitionGroup>
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
    );
  }
}

ToDoForm.propTypes = {
  todos: PropTypes.array.isRequired
};
ToDoForm.defaultTypes = {
  todos: []
};

export default ToDoForm;
