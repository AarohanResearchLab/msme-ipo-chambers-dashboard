import React, { useState } from 'react'
import { MICMemberProfiles } from '/imports/db/MICMemberProfiles';
import { Meteor } from 'meteor/meteor';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from "@material-ui/core/CardHeader";
import { Avatar, Button, CardActions, Grid } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: "80vh",
    },
    card: {
        width: 380,
        height: 250,
    },

    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 5,
    },
    avatar: {
        backgroundColor: red[500],
    }

}));

export default (props) => {
    const classes = useStyles();
    const userFirstName = !props.firstName ? Meteor.user().username : props.firstName;
    const title = "User : " + userFirstName
    const userLastName = !props.lastName ? "Not available!" : props.lastName;

    const userEmail = !props.email ? "Not available!" : props.email;
    const correspondanceEmail = "Correspondance Email : " + userEmail;

    const userContact = !props.mobileNumber ? "Not available!" : props.mobileNumber;
    const contactNumber = "Contact Number : " + userContact;

    const userSymbol = userFirstName.charAt(0);


    return (
        <Grid className={classes.root} container alignItems="center" justify="center">
            <Card className={classes.card} variant="outlined">

                <CardHeader
                    avatar={
                        <Avatar aria-label="user" className={classes.avatar}>
                            {userSymbol}
                        </Avatar>
                    }
                    title={title}
                    subheader={userLastName}
                />
                <hr />
                <CardContent>
                    <Typography className={classes.pos} variant="body2">
                        {correspondanceEmail}
                    </Typography>
                    <Typography className={classes.pos} variant="body2">
                        {contactNumber}
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button size="small">Edit</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}