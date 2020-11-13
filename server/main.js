import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {MICMembers} from '/imports/db/MICMembers'
import {SitePosts} from '/imports/db/SitePosts'
import {MICMemberProfiles} from '/imports/db/MICMemberProfiles'
import '/imports/api/EmailsSending'
import '/imports/api/ResetPassword'
import '/imports/api/CreateNewUsers'
import '/imports/api/RemoveUserAccount'


const SEED_USERNAME = 'maitenanceAdmin';
const SEED_PASSWORD = 'maintenance@Aarohan';

const ADMIN_USERNAME = 'Admin';
const ADMIN_PASSWORD = 'Admin';

const SEED_MEMBER_USERNAME = 'maitenanceMember';
const SEED_MEMBER_PASSWORD = 'maintenance@Aarohan';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
    Accounts.createUser({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    });
    Accounts.createUser({
      username: SEED_MEMBER_USERNAME,
      password: SEED_MEMBER_PASSWORD,
    });
  }

  if(MICMemberProfiles.find().count() === 0){
    MICMemberProfiles.insert(
      {
        loginId : "Admin",
        firstName: "Admin",
        lastName: "Admin",
        email: "msmeipochambers@gmail.com",
        mobileNumber: "",
      }
    )
  }

  process.env.MAIL_URL="smtps://msmeipochambers%40gmail.com:Softberry%40123@smtp.gmail.com:465/";
  
});
