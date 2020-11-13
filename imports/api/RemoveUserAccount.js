import { Meteor } from 'meteor/meteor';
Meteor.methods({
    'removeUserAccount': function (userId) {

        this.unblock();
        Meteor.users.remove(userId);
    }
});