import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

Meteor.methods({
  "todoss.insert"(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
  }
});
