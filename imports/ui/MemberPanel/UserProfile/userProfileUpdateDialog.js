import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { MICMemberProfiles } from '/imports/db/MICMemberProfiles';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default (props) => {
    const open = props.newDialogState;
    let allowSubmit = true;
    const [email, setEmail] = useState(props.email);
    const [email, setEmail] = useState(props.mobileNumber);
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
        if (email.length < 1 && !email.match(emailExp)) {
            allowSubmit = false && allowSubmit;
        }
    }

    const validateMobileNumber = () => {

    }

    const handleUpdateProfile = () => {
        //Validation
        validateEmailId();
        //UserExist
        if (allowSubmit) {

        } else {
            setNewSeverity("error")
            setMessage("Enter Valid Data")
            handleClickSnack();
        }

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
                />

                <TextField
                    required
                    margin="dense"
                    id="title"
                    label="Mobile Number"
                    fullWidth
                    value={mobile || ''}
                    onChange={(e) =>
                        setMobile(e.target.value)
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleUpdateProfile} color="primary">
                    Update Profile
                </Button>
                <Snackbar open={openSnack} autoHideDuration={4000} onClose={handleCloseSnack}>
                    <Alert onClose={handleCloseSnack} severity={newSeverity}>{message}</Alert>
                </Snackbar>
            </DialogActions>
        </Dialog>
    )
}