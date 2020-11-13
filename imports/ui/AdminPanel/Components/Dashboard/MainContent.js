import React from 'react'
import NewSignUpDataTables from './DataTables/NewSignUpDataTables'
import DisapprovedDataTables from './DataTables/DisapprovedDataTables'
import PaymentPendingDataTables from './DataTables/PaymentPendingDataTables'
import PendingConfirmationDataTables from './DataTables/PendingConfirmationDataTables'
import ActiveMembersDataTable from './DataTables/ActiveMembersDataTable'

export default (props) => {
    let state = <NewSignUpDataTables />
    switch (props.selectTable) {
        case 0: state = <NewSignUpDataTables />;
            break;
        case 1: state = <PaymentPendingDataTables />;
            break;
        case 2: state = <PendingConfirmationDataTables />;
            break;
        case 3: state = <ActiveMembersDataTable />;
            break;
        case 4: state = <DisapprovedDataTables />;
            break;
        default: state = <NewSignUpDataTables />;
            break;
    }
    return state
}