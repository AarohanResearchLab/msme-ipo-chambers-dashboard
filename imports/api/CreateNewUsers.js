import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
Meteor.methods({
    'createNewUsers': function (USERNAME, PASSWORD) {

        this.unblock();


        Accounts.createUser({
            username: USERNAME,
            password: PASSWORD,
        });
    }
});



