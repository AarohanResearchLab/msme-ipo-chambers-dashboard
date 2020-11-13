import React, { useState } from 'react'
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PaymentIcon from '@material-ui/icons/Payment';
import PanToolIcon from '@material-ui/icons/PanTool';
import SignUpDialog from './Dialogs/SignUpDialog';
import PaymentDetailsDialog from './Dialogs/PaymentDetailsDialog'
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "50vw",
        height: "100vh",
    },
    gridMainContaner: {
        flexGrow: 1,
        // width: "100vw",
        height: "100vh",
    },

    buttons: {
        margin: theme.spacing(2)
    }
}));

export default () => {
    const classes = useStyles();
    let myAlert = null;

    const [openSignUp, setSignUpOpen] = useState(false);


    const handleSignUpClose = () => {
        setSignUpOpen(false);

    }
    const handleSignUpOpen = () => {
        setSignUpOpen(true);

    }

    const [openPaymentDialog, setPaymentDialogOpen] = useState(false);


    const handlePaymentDialogClose = () => {
        setPaymentDialogOpen(false);

    }
    const handlePaymentDialogOpen = () => {
        setPaymentDialogOpen(true);

    }

    //For SnackBar
    const [openSnack, setOpenSnack] = React.useState({ open: false, myAlert });

    const handleCloseSnack = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnack({ open: false, myAlert: null });
    };

    const handleCloseNewUser = () => {
        myAlert = <Alert onClose={handleCloseSnack} severity="success">
            Your data submitted! Wait for approval by email.
            </Alert>
            handleSignUpClose();
        setOpenSnack({ open: true, myAlert });
    }

    const handleCloseUserExist = () => {
        myAlert = <Alert onClose={handleCloseSnack} severity="error">Already Signed Up!</Alert>
        handleSignUpClose();
        setOpenSnack({ open: true, myAlert });
    }

    const handleClosePaymentSuccess = () => {
        myAlert = <Alert onClose={handleCloseSnack} severity="success">
            Your data submitted! Wait for approval by email.
            </Alert>
            handlePaymentDialogClose();
        setOpenSnack({ open: true, myAlert });
    }

    const handleClosePaymentPending = () => {
        myAlert = <Alert onClose={handleCloseSnack} severity="warning">
            Wait for Sign Up approval! 
            </Alert>
            handlePaymentDialogClose();
        setOpenSnack({ open: true, myAlert });
    }

    const handleCloseUserDoesNotExist = () => {
        myAlert = <Alert onClose={handleCloseSnack} severity="error">Email Id not registered! Please Sign Up</Alert>
        handlePaymentDialogClose();
        setOpenSnack({ open: true, myAlert });
    }



    return (
        <Paper elevation={2} className={classes.root}>
            <Grid container justify="flex-start" alignItems="center" direction="column" className={classes.gridMainContaner}>
                <Grid item>
                    <img src="/images/HomeBanner.jpg" />
                </Grid>
                <Grid item>
                    <Typography className={classes.buttons} variant="h3" color="primary" size="large">
                        Welcome New User!
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        endIcon={<PanToolIcon />}
                        className={classes.buttons}
                        onClick={handleSignUpOpen}
                    >Click to SignUp</Button>
                    <SignUpDialog handleClose={handleSignUpClose} 
                    newDialogState={openSignUp} 
                    handleCloseNewUser={handleCloseNewUser} 
                    handleCloseUserExist={handleCloseUserExist}/>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<PaymentIcon />}
                        size="large"
                        className={classes.buttons}
                        onClick={handlePaymentDialogOpen}
                    >Click to Enter Payment Details</Button>
                    <PaymentDetailsDialog 
                    handleClose={handlePaymentDialogClose} 
                    newDialogState={openPaymentDialog} 
                    handleClosePaymentSuccess={handleClosePaymentSuccess}
                    handleCloseUserDoesNotExist={handleCloseUserDoesNotExist}
                    handleClosePaymentPending={handleClosePaymentPending}
                    />
                </Grid>
            </Grid>
            <Snackbar open={openSnack.open} autoHideDuration={4000} onClose={handleCloseSnack}>
                {openSnack.myAlert}
            </Snackbar>
        </Paper>
    )

}