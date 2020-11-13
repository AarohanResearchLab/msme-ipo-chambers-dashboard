import * as React from 'react';
import { Fragment } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useTracker } from 'meteor/react-meteor-data';
import { MICMembers } from '/imports/db/MICMembers';
import { Button } from '@material-ui/core';

const columns = [
  // { field: 'id', headerName: 'ID', width: 0 },
  { field: 'firstName', headerName: 'First name', width: 200 },
  { field: 'lastName', headerName: 'Last name', width: 200 },
  { field: 'emailId', headerName: 'User Id', width: 200 },
  { field: 'mobileNumber', headerName: 'Mobile Number', type: 'number', width: 130 },
  { field: 'companyName', headerName: 'Company Name', width: 400 },
  { field: 'cin', headerName: 'CIN', width: 250 },
];

// sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function DisapprovedDataTables() {
  let selected = [];
  const newSignUps = useTracker(() => MICMembers.find({ status: 'disapproved' }).fetch());

  let rows = newSignUps.map((newSignUp) => {
    return (
      {
        id: newSignUp._id,
        firstName: newSignUp.firstName,
        lastName: newSignUp.lastName,
        emailId: newSignUp.emailId,
        mobileNumber: newSignUp.mobileNumber,
        companyName: newSignUp.companyName,
        cin: newSignUp.cin
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
          selected.forEach((item) =>
            MICMembers.update(
              item.id, {
              $set: { status: 'payment-pending' }
            }

            )
          )
        }
      } variant="contained" color="primary" size="large" style={{ float:"left", marginLeft:40 }}>
        Approve
        </Button>

      <Button onClick={
        () => {
          selected.forEach((item) =>
            MICMembers.remove(
              item.id
            )
          )
        }
      } variant="contained" color="secondary" size="large" style={{ float:"right", marginRight:40 }}>
        Delete
        </Button>
        </div>
    </Fragment>
  );
}
