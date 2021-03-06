import * as React from 'react';
import { Fragment } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useTracker } from 'meteor/react-meteor-data';
import { MICMembers } from '/imports/db/MICMembers';
import { Button } from '@material-ui/core';
import { MICMemberProfiles } from '/imports/db/MICMemberProfiles';

const columns = [
    // { field: 'id', headerName: 'ID', width: 0 },
    { field: 'firstName', headerName: 'First name', width: 200 },
    { field: 'lastName', headerName: 'Last name', width: 200 },
    { field: 'emailId', headerName: 'User Id', width: 200 },
    { field: 'mobileNumber', headerName: 'Mobile Number', type: 'number', width: 130 },
    { field: 'companyName', headerName: 'Company Name', width: 400 },
    { field: 'cin', headerName: 'CIN', width: 250 },
    { field: 'amount', headerName: 'Payment Received', width: 200 },
    { field: 'bankName', headerName: 'Bank', width: 200 },
    { field: 'transactionId', headerName: 'Transaction Id', width: 200 },
    { field: 'activatedAt', headerName: 'Membership Activation Date', width: 300 },
    { field: 'membershipExpiry', headerName: 'Membership Expiry Date', width: 300 },
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

export default function NewSignUpDataTables() {
    let selected = [];
    const newSignUps = useTracker(() => MICMembers.find({ status: 'active' }).fetch());

    const removeProfile = (item) => {
        const info = MICMemberProfiles.findOne({ loginId: item.emailId })
        MICMemberProfiles.remove(info._id);
        const usr = Meteor.users.findOne({ username: item.emailId })
        Meteor.call(
            'removeUserAccount',
            usr._id
        )
    }

    let rows = newSignUps.map((newSignUp) => {
        return (
            {
                id: newSignUp._id,
                firstName: newSignUp.firstName,
                lastName: newSignUp.lastName,
                emailId: newSignUp.emailId,
                mobileNumber: newSignUp.mobileNumber,
                companyName: newSignUp.companyName,
                cin: newSignUp.cin,
                amount: newSignUp.amount,
                bankName: newSignUp.bankName,
                transactionId: newSignUp.transactionId,
                activatedAt: newSignUp.activatedAt,
                membershipExpiry: newSignUp.membershipExpiry
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
                <Button variant="contained" color="primary" size="large" style={{ float: "left", marginLeft: 40 }}>
                    Download Receipt
                </Button>

                <Button onClick={
                    () => {
                        selected.forEach((item) =>
                            MICMembers.update(
                                item.id, {
                                $set: {
                                    status: 'disapproved',
                                    activatedAt: null,
                                    membershipExpiry: null
                                }
                            }

                            )
                        )
                        //Profile Remove and Delete User Account
                        selected.forEach(removeProfile(item))

                    }
                } variant="contained" color="secondary" size="large" style={{ float: "right", marginRight: 40 }}>
                    Disapprove
        </Button>
            </div>
        </Fragment>
    );
}
