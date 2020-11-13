import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'


Meteor.methods({
    'resetUserPassword': function(userId, password) {
      
      this.unblock();
  
      Accounts.setPassword(userId,password);
    }
  });



