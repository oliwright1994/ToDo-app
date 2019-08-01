import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";
import Todo from "../../components/ToDo";
import ToDoCount from "../../components/ToDoCount";
import AddToDo from "../../components/AddToDo";
import ClearButton from "../../components/ClearButton";
import Header from "../../components/Header";
import { ToDos } from "../../../api/todos";
import AccountsUIWrapper from "../../components/AccountsUIWrapper";
import { withTracker } from "meteor/react-meteor-data";
import "../../../start-up/accounts-config";
import ToDoForm from "../../components/ToDoForm";

const App = ({ todos, currentUser, currentUserId }) => {
  return (
    <div>
      <div className="app-wrapper">
        <div className="login-wrapper">
          <AccountsUIWrapper />
        </div>
        <div className="todo-list">
          {currentUser ? (
            <div>
              <Header />
              <ToDoForm todos={todos} user={currentUserId} />
            </div>
          ) : (
            <div className="logged-out-message">
              <p>Please sign in to see your todos.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withTracker(() => {
  Meteor.subscribe("todos");
  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    todos: ToDos.find({}).fetch()
  };
})(App);
