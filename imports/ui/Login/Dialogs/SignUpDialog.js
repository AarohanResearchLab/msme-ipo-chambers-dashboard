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
import { Meteor } from 'meteor/meteor';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default (props) => {
    let allowSubmit = true;
    let userDoesNotExist = true;
    let otp=0;
    const open = props.newDialogState;
    const [disableOTP, setDisableOTP] = useState(false);
    const [oneTimePass, setOneTimePass] = useState('');

    const [firstName, setFirstname] = useState({
        text: '',
        error: false
    });
    const [lastName, setLastname] = useState({
        text: '',
        error: false
    });
    const [mobileNumber, setMobileNumber] = useState({
        text: '',
        error: false
    });
    const [emailId, setEmailId] = useState({
        text: '',
        error: false
    });
    const [companyName, setCompanyNane] = useState({
        text: '',
        error: false
    });
    const [cin, setCin] = useState({
        text: '',
        error: false
    });

    const [otpVal, setOTPValue] = useState({
        text: '',
        error: false
    });

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

    //Validations
    const validateFirstName = () => {
        const expression = /^[A-Za-z]+$/;
        const text = firstName.text
        if (firstName.text.length < 2) {
            setFirstname({ text, error: true });
            allowSubmit = false && allowSubmit;
        }
        if (!firstName.text.match(expression)) {
            setFirstname({ text, error: true });
            allowSubmit = false && allowSubmit;
        }

    }

    const validateLastName = () => {
        const expression = /^[A-Za-z]+$/;
        const text = lastName.text
        if (lastName.text.length < 1) {
            setLastname({ text, error: true });
            allowSubmit = false && allowSubmit;
        }
        if (!lastName.text.match(expression)) {
            setLastname({ text, error: true });
            allowSubmit = false && allowSubmit;
        }

    }

    const validateMobileNumber = () => {
        const numbers = /^[0-9]+$/;
        const text = mobileNumber.text
        if (!mobileNumber.text.match(numbers)) {
            setMobileNumber({ text, error: true });
            allowSubmit = false && allowSubmit;
        }
        if (mobileNumber.text.length !== 10) {
            setMobileNumber({ text, error: true });
            allowSubmit = false && allowSubmit;
        }
    }

    const validateEmailId = () => {
        const emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const text = emailId.text
        if (!emailId.text.match(emailExp)) {
            setEmailId({ text, error: true });
            allowSubmit = false && allowSubmit;
        }
    }

    const validateCompanyName = () => {
        const expression = /^[A-Za-z_ ]*$/;
        const text = companyName.text
        if (companyName.text.length < 1) {
            setCompanyNane({ text, error: true });
            allowSubmit = false && allowSubmit;
        }
        if (!companyName.text.match(expression)) {
            setCompanyNane({ text, error: true });
            allowSubmit = false && allowSubmit;
        }
    }

    const validateCIN = () => {
        const expression = /^[a-zA-Z0-9]/;
        const text = cin.text
        if (cin.text.length !== 21) {
            setCin({ text, error: true });
            allowSubmit = false && allowSubmit;
        }
        if (!cin.text.match(expression)) {
            setCin({ text, error: true });
            allowSubmit = false && allowSubmit;
        }
    }

    const validateOTP = () => {
        if(oneTimePass!=='' && oneTimePass !== otpVal.text){
            allowSubmit = false && allowSubmit;
            console.log(oneTimePass+" : "+otpVal.text)
        }
    }

    const reset = () => {
        setFirstname({ text: '', error: false });
        setLastname({ text: '', error: false });
        setMobileNumber({ text: '', error: false });
        setEmailId({ text: '', error: false });
        setCompanyNane({ text: '', error: false });
        setCin({ text: '', error: false });
        setOTPValue({ text: '', error: false });
        setDisableOTP(false);
        setOneTimePass('')
        otp=0;
    }

    //validations ends

    const handleSubmit = () => {
        validateFirstName();
        validateLastName();
        validateMobileNumber();
        validateEmailId();
        validateCompanyName();
        validateCIN();
        validateOTP();

        if (allowSubmit) {
            userDoesNotExist = MICMembers.findOne({ emailId: emailId.text }) ? false : true;
            if (userDoesNotExist) {

                MICMembers.insert({
                    firstName: firstName.text,
                    lastName: lastName.text,
                    emailId: emailId.text,
                    mobileNumber: mobileNumber.text,
                    companyName: companyName.text,
                    cin: cin.text,
                    status: 'new'
                })
                Meteor.call(
                    'sendEmail',
                    emailId.text,
                    'msmeipochambers@gmail.com',
                    'You have been successfully Signed up at MSMEIPOCHAMBERS!',
                    'Thank you for signing up with us! But this is first step in joining us.'+ 
                    ' We will initiate payment process after verification, '+
                    'on completion of this step you will be provided with your user credentials. '+
                    'We will inform you for further steps via email'
                );
                
                props.handleCloseNewUser();

            } else {

                props.handleCloseUserExist();
            }
            reset();
        } else {
            handleClickSnack(); //opens Snack bar on invalid data entry
        }

        allowSubmit = true;

    }

    const sendOTP = () => {
        validateEmailId();
        if (allowSubmit) {
            setDisableOTP(true);
            otp=Math.floor(1000 + Math.random() * 9000);
            setOneTimePass(''+otp)
            Meteor.call(
                'sendEmail',
                emailId.text,
                'msmeipochambers@gmail.com',
                'OTP for sign up!',
                'Your otp is ' + otp + ', valid for 120 seconds'
            );
            setTimeout(() => {
                
                setDisableOTP(false);
                props.handleClose();
            }, 120000);
        }
        allowSubmit=true;
    }
    return (
        <Dialog open={open} /*onClose={props.handleClose}*/ aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Please enter your details for SignUp</DialogTitle>
            <DialogContent>

                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    type="text"
                    value={firstName.text || ''}
                    onChange={(e) => setFirstname({ text: e.target.value })
                    }
                    error={firstName.error}
                    fullWidth
                    helperText="First Name should have atleast 2 letters of english alphabet"
                />
                <TextField
                    required

                    margin="dense"
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    value={lastName.text || ''}
                    onChange={(e) => setLastname({ text: e.target.value })
                    }
                    error={lastName.error}
                    fullWidth
                    helperText="Last Name should have atleast 2 letters of english alphabet"
                />
                <TextField
                    required

                    margin="dense"
                    id="mobileNumber"
                    name="mobileNumber"
                    label="Mobile Number"
                    type="text"
                    value={mobileNumber.text || ''}
                    onChange={(e) => setMobileNumber({ text: e.target.value })
                    }
                    error={mobileNumber.error}
                    fullWidth
                    helperText="10 digit number"
                />
                <TextField
                    required

                    margin="dense"
                    id="emailId"
                    name="emailId"
                    label="Email Id"
                    type="email"
                    value={emailId.text || ''}
                    onChange={(e) => setEmailId({ text: e.target.value })
                    }
                    error={emailId.error}
                    fullWidth
                    helperText="Enter a valid Email Id, this will be used as your User ID"
                />

                <TextField
                    required

                    margin="dense"
                    id="companyName"
                    name="companyName"
                    label="Company Name"
                    type="text"
                    value={companyName.text || ''}
                    onChange={(e) => setCompanyNane({ text: e.target.value })
                    }
                    error={companyName.error}
                    fullWidth
                    helperText="Enter a valid Company Name"
                />
                <TextField
                    required
                    margin="dense"
                    id="cin"
                    name="cin"
                    label="CIN"
                    type="text"
                    value={cin.text || ''}
                    onChange={(e) => setCin({ text: e.target.value })
                    }
                    error={cin.error}
                    fullWidth
                    helperText="Enter above mentioned Company's CIN without spaces and hyphens"
                />
                <TextField
                    required

                    margin="dense"
                    id="otp"
                    label="OTP"
                    type="text"
                    fullWidth
                    disabled={!disableOTP}
                    color="secondary"
                    value={otpVal.text || ''}
                    error={otpVal.error}
                    onChange={(e) => setOTPValue({ text: e.target.value })
                    }
                    helperText="OTP sent to your provided Email Id"
                />
            </DialogContent>
            <DialogActions>
                <Button disabled={disableOTP} onClick={sendOTP} color="primary">
                    Send OTP
                </Button>
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