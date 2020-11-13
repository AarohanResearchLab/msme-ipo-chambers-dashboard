import React, { useState } from 'react'
import { Grid } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import ForgetLoginDialog from './Dialogs/ForgetLoginDialog'
import { makeStyles } from '@material-ui/core/styles';
import ReportIcon from '@material-ui/icons/Report';
import SignIn from './SignIn'
import SignUp from './SignUp'



const useStyles = makeStyles((theme) => ({


    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },

}));

export default () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);


    const handleClose = () => {
        setOpen(false);

    }
    const handleOpen = () => {
        setOpen(true);

    }
    return (
        <Grid container  >
            <Grid item><SignUp /></Grid>

            <Grid item ><SignIn /></Grid>
            <Fab variant='extended' color="primary" aria-label="add" className={classes.fab} onClick={handleOpen}>
                <ReportIcon />
                 Forget Password?
            </Fab>
            <ForgetLoginDialog handleClose={handleClose} newDialogState={open} />
        </Grid>
    )
}