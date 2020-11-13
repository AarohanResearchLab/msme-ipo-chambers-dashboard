import React, { useState } from 'react'
import PanToolIcon from '@material-ui/icons/PanTool';
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AppBar from '@material-ui/core/AppBar';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import ClearIcon from '@material-ui/icons/Clear';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Badge } from '@material-ui/core';
import { useTracker } from 'meteor/react-meteor-data';
import { MICMembers } from '/imports/db/MICMembers';

export default (props) => {
    const newSignUps = useTracker(() => MICMembers.find({ status: 'new' }).count());
    const paymentPending = useTracker(() => MICMembers.find({ status: 'payment-pending' }).count());
    const pendingConfirmation = useTracker(() => MICMembers.find({ status: 'payment-updated' }).count());
    const allMembers = useTracker(() => MICMembers.find({ status: 'active' }).count());
    const disapproved = useTracker(() => MICMembers.find({ status: 'disapproved' }).count());
    
    return (
        <AppBar position="static" color="default">
            <Tabs
                value={props.value}
                onChange={props.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
                <Tab icon={
                    <Badge badgeContent={newSignUps} color="primary">
                        <PanToolIcon />
                    </Badge>

                } label="All Sign-Ups" />
                <Tab icon={
                    <Badge badgeContent={paymentPending} color="secondary">
                        <HourglassFullIcon />
                    </Badge>
                } label="Payment Pending" />
                <Tab icon={
                    <Badge badgeContent={pendingConfirmation} color="primary">
                        <GroupAddIcon />
                    </Badge>
                } label="Pending for Confirmation" />
                <Tab icon={
                    <Badge badgeContent={allMembers} color="primary">
                        <GroupIcon />
                    </Badge>
                } label="All Active Members" />
                <Tab icon={
                    <Badge badgeContent={disapproved} color="secondary">
                        <ClearIcon color="secondary"/>
                    </Badge>
                } label="Disapproved" />
            </Tabs>
        </AppBar>
    )
}