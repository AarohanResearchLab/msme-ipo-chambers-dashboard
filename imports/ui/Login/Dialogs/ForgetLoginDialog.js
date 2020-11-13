import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Accounts } from 'meteor/accounts-base';
import { MICMemberProfiles } from '/imports/db/MICMemberProfiles';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default (props) => {
    const open = props.newDialogState;
    let allowSubmit = true;
    const [email, setEmail] = useState('');
    const [newSeverity, setNewSeverity] = useState("error");
    const [message, setMessage] = useState("");

    //For SnackBar
    const [openSnack, setOpenSnack] = useState(false);

    const handleClickSnack = () => {
        setOpenSnack(true);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnack(false);
    };

    const validateEmailId = () => {
        const emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.match(emailExp)) {
            allowSubmit = false && allowSubmit;
        }
    }

    const handleSendPassword = () => {
        //Validation
        validateEmailId();
        //UserExist
        let validId = MICMemberProfiles.findOne({ email: email });


        if (!validId) {
            allowSubmit = false && allowSubmit;
            setNewSeverity("error")
            setMessage("Email does not match our records")
        }
        if (allowSubmit) {
            let pass = '' + Math.floor(10000000 + Math.random() * 90000000);
            let id = Meteor.users.findOne({username:validId.loginId});
            Meteor.call(
                'resetUserPassword',
                id._id,
                pass
            );

            setNewSeverity("success")
            setMessage("New password email sent to your email address")
            Meteor.call(
                'sendEmail',
                email,
                'msmeipochambers@gmail.com',
                'New password for msmeipochambers',
                'Password : ' + pass + '. This is a temporary password, please change it as soon as possible'
            );
        }


        setEmail('');
        allowSubmit = true;
        handleClickSnack();
    }
    return (
        <Dialog open={open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">We will send you a new password</DialogTitle>
            <DialogContent>

                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Email Id"
                    type="email"
                    fullWidth
                    value={email || ''}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    helperText="Enter your Correspondance Email Address (By default Registered Email Id)"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSendPassword} color="primary">
                    Send Password
                </Button>
                <Snackbar open={openSnack} autoHideDuration={4000} onClose={handleCloseSnack}>
                    <Alert onClose={handleCloseSnack} severity={newSeverity}>{message}</Alert>
                </Snackbar>
            </DialogActions>
        </Dialog>
    )
}