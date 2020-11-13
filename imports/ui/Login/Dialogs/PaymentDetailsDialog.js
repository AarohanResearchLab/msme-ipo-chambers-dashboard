import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { MICMembers } from '/imports/db/MICMembers';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default (props) => {
    const open = props.newDialogState;
    let allowSubmit = true;
    let userDoesNotExist = false;
    const [emailId, setEmailId] = useState({ text: '', error: false });
    const [amount, setAmount] = useState({ text: '', error: false });
    const [bankName, setBankName] = useState({ text: '', error: false });
    const [transactionId, setTransactionId] = useState({ text: '', error: false });

    //For Snack bar
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

    //validations
    const validateEmailId = () => {
        const emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const text = emailId.text
        if (!emailId.text.match(emailExp)) {
            setEmailId({ text, error: true });
            allowSubmit = false && allowSubmit;
        }
    }

    const validateBankName = () => {
        const expression = /^[A-Za-z_ ]*$/;
        const text = bankName.text
        if (bankName.text.length < 1) {
            setBankName({ text, error: true });
            allowSubmit = false && allowSubmit;
        }
        if (!bankName.text.match(expression)) {
            setBankName({ text, error: true });
            allowSubmit = false && allowSubmit;
        }
    }

    const validateAmount = () => {
        const numbers = /^[0-9]+$/;
        const text = amount.text
        if (!amount.text.match(numbers)) {
            setAmount({ text, error: true });
            allowSubmit = false && allowSubmit;
        }
        if (parseInt(amount.text) !== 6000) {
            setAmount({ text, error: true });
            allowSubmit = false && allowSubmit;
        }
    }

    const validateTransactionId = () => {
        const expression = /^[a-zA-Z0-9]/;
        const text = transactionId.text

        if (!transactionId.text.match(expression)) {
            setTransactionId({ text, error: true });
            allowSubmit = false && allowSubmit;
        }
    }

    const reset = () => {
        setEmailId({ text: '', error: false });
        setAmount({ text: '', error: false });
        setBankName({ text: '', error: false });
        setTransactionId({ text: '', error: false });
        allowSubmit = true;
    }


    //validations end

    const handleSubmit = () => {
        validateEmailId();
        validateAmount();
        validateBankName();
        validateTransactionId();

        if (allowSubmit) {
            userDoesNotExist = MICMembers.findOne({ emailId: emailId.text }) ? false : true;
            if (!userDoesNotExist) {
                const record = MICMembers.findOne({ emailId: emailId.text, status: 'payment-pending' });
                let signUpApproved = record ? true : false;
                if (signUpApproved) {
                    MICMembers.update(
                        record._id,
                        {
                            $set: {
                                amount: amount.text,
                                bankName: bankName.text,
                                transactionId: transactionId.text,
                                status: 'payment-updated'
                            }
                        }
                    )
                    Meteor.call(
                        'sendEmail',
                        emailId.text,
                        'msmeipochambers@gmail.com',
                        'Your payment details have been registered at MSMEIPOCHAMBERS!',
                        'Thank you for completing payments! We will shortly send you your user credentials after verification. ' +
                        'We will inform you for further steps via email.'
                    )
                    props.handleClosePaymentSuccess();
                } else {
                    props.handleClosePaymentPending();
                }
            } else {

                props.handleCloseUserDoesNotExist();
            }
            reset();
        } else {
            handleClickSnack(); //opens Snack bar on invalid data entry
        }
    }

    return (
        <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Please enter your Membership Payment Details</DialogTitle>
            <DialogContent>

                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Id"
                    type="email"
                    value={emailId.text || ''}
                    onChange={(e) => setEmailId({ text: e.target.value })
                    }
                    error={emailId.error}
                    fullWidth
                    helperText="Enter your registered Email Id"
                />
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="amount"
                    label="Amount"
                    type="text"
                    value={amount.text || ''}
                    onChange={(e) => setAmount({ text: e.target.value })
                    }
                    error={amount.error}
                    helperText="Amounnt should be 6000"
                    fullWidth

                />
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="bankName"
                    label="Bank Name"
                    type="text"
                    value={bankName.text || ''}
                    onChange={(e) => setBankName({ text: e.target.value })
                    }
                    error={bankName.error}
                    fullWidth

                />
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="transactionId"
                    label="Transaction Id"
                    type="text"
                    value={transactionId.text || ''}
                    onChange={(e) => setTransactionId({ text: e.target.value })
                    }
                    error={transactionId.error}
                    fullWidth

                />
                {/*Date selector*/}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
                <Snackbar open={openSnack} autoHideDuration={4000} onClose={handleCloseSnack}>
                    <Alert onClose={handleCloseSnack} severity="error">Enter Valid Data!</Alert>
                </Snackbar>
            </DialogActions>
        </Dialog>
    )
}