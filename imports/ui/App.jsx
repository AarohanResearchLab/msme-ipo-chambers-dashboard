import { Meteor } from 'meteor/meteor';
import React from 'react';
import Welcome from './Login/Welcome'
import AdminPanel from './AdminPanel/AdminPanel'
import { useTracker } from 'meteor/react-meteor-data';
import ProgressBanner from './ProgressBanner'
import MemberPanel from './MemberPanel/MemberPanel';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  
  let panel = <ProgressBanner />;

  if(user){
    if(user.username === "Admin" || user.username === "maitenanceAdmin" ){
      panel=<AdminPanel />;
    }
    else{
      panel=<MemberPanel />;
    }
  } else if(user === null) {
    panel=<Welcome />;
  } else {
    panel = <ProgressBanner />
  }

  return panel
}