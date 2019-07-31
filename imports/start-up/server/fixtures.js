import { Meteor } from "meteor/meteor";
import { ToDos } from "../../api/todos";

Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    user = Accounts.createUser({
      email: "o@m.com",
      password: "password"
    });
  }
  if (ToDos.find().count() === 0) {
    ToDos.insert({
      title: "Learn React",
      complete: false
    });
    ToDos.insert({
      title: "Learn Meteor",
      complete: false
    });
  }
});
