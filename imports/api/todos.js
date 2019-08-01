import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

if (Meteor.isServer) {
  Meteor.publish("todos", function todosPublication() {
    return ToDos.find({ owner: this.userId });
  });
}

Meteor.methods({
  "todos.toggleComplete"(todo, user) {
    if (todo.owner !== user) {
      throw new Meteor.Error(
        "todos.toggleComplete.not-authorized",
        "You are not allowed to update to-dos for other users."
      );
    }
    ToDos.update({ _id: todo._id }, { $set: { complete: !todo.complete } });
  },
  "todos.removeTodo"(todo, user) {
    if (todo.owner !== user) {
      throw new Meteor.Error(
        "todos.toggleComplete.not-authorized",
        "You are not allowed to delete to-dos for other users."
      );
    }
    ToDos.remove({ _id: todo._id });
  },
  "todos.clearCompleted"(user) {
    ToDos.remove({ complete: true, owner: user });
  },
  "todos.addToDo"(todo, user) {
    ToDos.insert({
      title: todo,
      complete: false,
      owner: user
    });
  }
});
export const ToDos = new Mongo.Collection("todos");
