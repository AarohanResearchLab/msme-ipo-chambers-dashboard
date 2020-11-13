import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Accounts } from 'meteor/accounts-base'
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { MICMemberProfiles } from '/imports/db/MICMemberProfiles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

        height: "100vh",

    },
    textFields: {
        flexGrow: 1,
        margin: theme.spacing(1),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        width: 300,

    },
    buttons: {
        flexGrow: 1,
        margin: theme.spacing(2),
    },
    actionPaper: {
        padding: theme.spacing(2)
    },
    simpleMargin: {
        margin: theme.spacing(1)
    },
    imgMargin: {
        margin: theme.spacing(1)
    }
}));

export default () => {
    const classes = useStyles();
    let allowSubmit = true;
    let allowSubmitPassword = true;


    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailId, setEmailId] = useState('');
    const [loginId, setLoginId] = useState('');
    const [changeHelperText, setChangeHelperText] = useState("Not Matched");
    const [newSeverity, setNewSeverity] = useState("error");
    const [message, setMessage] = useState("");
    const validateEmailId = () => {
        const emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailId.match(emailExp)) {
            allowSubmit = false && allowSubmit;
        }
    }

    const validatePassword = () => {
        const expression = /^[A-Za-z0-9]/;

        if (newPassword.length < 8 || newPassword.length > 20) {

            allowSubmitPassword = false && allowSubmitPassword;
        }
        if (!newPassword.match(expression)) {

            allowSubmitPassword = false && allowSubmitPassword;
        }

    }


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
    const checkEquality = (val) => {
        console.log(newPassword)
        console.log(val)
        if (newPassword.length >= 8 && newPassword.length <= 20 && newPassword === val) {
            allowSubmitPassword = true;
            setChangeHelperText("Matched")
        } else {
            allowSubmitPassword = false;
            setChangeHelperText("Not Matched")
        }
    }


    return (


        <Grid container justify="space-evenly" alignItems="center" direction="row" className={classes.root}>

            <Grid item >
                <Paper className={classes.actionPaper}>
                    <Grid container justify="center" alignItems="center" direction="column">
                        <Typography variant="h4" color="primary" className={classes.simpleMargin}>
                            Update Correspondence Email
                     </Typography>
                        <TextField
                            id="loginId"
                            label="Registered Email Id"
                            variant="outlined"
                            className={classes.textFields}
                            required
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                        />
                        <TextField
                            id="newEmailId"
                            label="New Email Address"
                            variant="outlined"
                            className={classes.textFields}
                            required
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                        />

                        <Button type="submit" variant="contained" color="primary" className={classes.buttons} onClick={
                            () => {
                                validateEmailId();
                                if (allowSubmit) {
                                    let member = MICMemberProfiles.findOne({ loginId: loginId });
                                   
                                    if (member) {
                                        MICMemberProfiles.update(member._id, {
                                            $set: {
                                                email: emailId
                                            }
                                        })
                                        setNewSeverity("success")
                                        setMessage("Your Email Address Updated")
                                        handleClickSnack();
                                    } else {
                                        setNewSeverity("error")
                                        setMessage("Enter valid Registered Email Id")
                                        handleClickSnack();
                                    }
                                } else {
                                    setNewSeverity("error")
                                    setMessage("Enter Valid Email")
                                    handleClickSnack();
                                }
                                setEmailId('');
                                setLoginId('');
                                allowSubmit = true;
                            }
                        }>
                            change
                             </Button>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item >
                <Paper className={classes.actionPaper}>
                    <Grid container justify="center" alignItems="center" direction="column">
                        <Typography variant="h4" color="primary" className={classes.simpleMargin}>
                            Change Password
                     </Typography>
                        <TextField
                            id="oldPassword"
                            label="Old Password"
                            variant="outlined"
                            type="password"
                            className={classes.textFields}
                            required
                            value={oldPassword || ''}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />

                        <TextField
                            id="newPassword"
                            label="New Password"
                            type="password"
                            variant="outlined"
                            className={classes.textFields}
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            helperText="Rules: It should be 8-20 characters long and contians only Aplhabets and Numbers"
                        />

                        <TextField
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            className={classes.textFields}
                            required
                            value={confirmPassword}
                            helperText={changeHelperText}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                                checkEquality(e.target.value);
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary" className={classes.buttons} onClick={
                            () => {
                                validatePassword();
                                if (allowSubmitPassword) {
                                    Accounts.changePassword(oldPassword, newPassword, function (e, r) {
                                        if (e) {
                                            setNewSeverity("error")
                                            setMessage("Old Password is wrong")
                                            handleClickSnack();
                                        } else {
                                            setNewSeverity("success")
                                            setMessage("Password Updated")
                                            handleClickSnack();
                                        }
                                        setConfirmPassword('')
                                        setNewPassword('')
                                        setOldPassword('')
                                    }

                                    )
                                } else {
                                    setNewSeverity("error")
                                    setMessage("New Password does not conform to rules")
                                    handleClickSnack();
                                }
                                allowSubmitPassword = true;
                            }
                        }>
                            change
                             </Button>

                    </Grid>
                </Paper>
            </Grid>
            <Snackbar open={openSnack} autoHideDuration={4000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={newSeverity}>{message}</Alert>
            </Snackbar>
        </Grid>

    )
}