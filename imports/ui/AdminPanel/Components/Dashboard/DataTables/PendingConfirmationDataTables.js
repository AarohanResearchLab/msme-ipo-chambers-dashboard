import * as React from 'react';
import { Fragment } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useTracker } from 'meteor/react-meteor-data';
import { MICMembers } from '/imports/db/MICMembers';
import { Button } from '@material-ui/core';

const columns = [
  // { field: 'id', headerName: 'ID', width: 0 },
  { field: 'companyName', headerName: 'Company Name', width: 400 },
  { field: 'cin', headerName: 'CIN', width: 250 },
  { field: 'amount', headerName: 'Payment Received', width: 200 },
  { field: 'bankName', headerName: 'Bank', width: 200 },
  { field: 'transactionId', headerName: 'Transaction Id', width: 200 },
  { field: 'firstName', headerName: 'First name', width: 200 },
  { field: 'lastName', headerName: 'Last name', width: 200 },
  { field: 'emailId', headerName: 'User Id', width: 200 },
  { field: 'mobileNumber', headerName: 'Mobile Number', type: 'number', width: 130 },
  
];


export default function PendingConfirmationDataTables() {
  let selected = [];
  const newSignUps = useTracker(() => MICMembers.find({ status: 'payment-updated' }).fetch());

  let rows = newSignUps.map((newSignUp) => {
    return (
      {
        id: newSignUp._id,
        companyName: newSignUp.companyName,
        cin: newSignUp.cin,
        amount: newSignUp.amount,
        bankName: newSignUp.bankName,
        transactionId: newSignUp.transactionId,
        firstName: newSignUp.firstName,
        lastName: newSignUp.lastName,
        emailId: newSignUp.emailId,
        mobileNumber: newSignUp.mobileNumber,
      }
    )
  }

  )

  return (
    <Fragment>
      <div style={{ height: 400, width: '100%', marginBottom: 20 }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection onSelectionChange={({ rows }) => {
          selected = rows;
        }} />
      </div>
      <div style={{ width: '100%' }}>
      <Button onClick={
        () => {
          let d = new Date();
          let year = d.getFullYear();
          let month = d.getMonth();
          let day = d.getDate();
          let c = new Date(year + 1, month, day);
           //Activate-membership
          selected.forEach((item) =>
            MICMembers.update(
              item.id, {
              $set: { status: 'active',
                      activatedAt : d,
                      membershipExpiry : c,
             }
            }

            )
          )
           //Create Profile
           selected.forEach((item) =>
           MICMemberProfiles.insert(
             {
               loginId: item.emailId,
               firstName: item.firstName,
               lastName: item.lastName,
               email: item.emailId,
               mobileNumber: item.mobileNumber,
               activatedAt: d,
               membershipExpiry: c,
               amount: item.amount,
               bankName: item.bankName,
               transactionId: item.transactionId,
             }
           )
         )
         //Create Credentials
         selected.forEach((item) =>
           Meteor.call(
             'createNewUsers',
             item.emailId,
             item.mobileNumber
           )
         )
         //Send welcome Mail
         selected.forEach((item) =>
           Meteor.call(
             'sendEmail',
             item.emailId,
             'msmeipochambers@gmail.com',
             'Welcome Mr/Mrs. ' + item.firstName + ' to MSMEIPOCHAMBERS! Here are your Credentials',
             'Greetings! Your membership request has been approved,' +
             ' Registered Email Id (User Id): ' + item.emailId + ' Password : ' + item.mobileNumber

           )
         )
        }
      } variant="contained" color="primary" size="large" style={{ float:"left", marginLeft:40 }}>
        Make member
        </Button>

      <Button onClick={
        () => {
          selected.forEach((item) =>
            MICMembers.update(
              item.id, {
              $set: { status: 'disapproved' }
            }

            )
          )
        }
      } variant="contained" color="secondary" size="large" style={{ float:"right", marginRight:40 }}>
        Disapprove
        </Button>
        </div>
    </Fragment>
  );
}
