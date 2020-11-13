import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

import LockOpenIcon from '@material-ui/icons/LockOpen';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "50vw",
        height: "100vh",
        display: "inline",
        position: "absolute"
    },
    gridMainContaner: {
        flexGrow: 1,
        // width: "100vw",
        height: "100vh",
        position: "relative"
    },

    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
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
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(false);


    return (
        <Paper elevation={2} className={classes.root} >


            <Grid container justify="center" alignItems="center" direction="column" className={classes.gridMainContaner}>
                <Grid item>
                    <img src="/images/logo_msmei.png" className={classes.imgMargin} />
                </Grid>

                <Grid item >
                    <Typography variant="h4" color="primary" className={classes.simpleMargin}>
                        Login Here
                     </Typography>
                </Grid>
                <Grid item>
                    <LockOpenIcon fontSize="large" color="secondary" className={classes.simpleMargin} />
                </Grid>
                <Grid item >
                    <Paper className={classes.actionPaper}>
                        <Grid container justify="center" alignItems="center" direction="column">
                            <TextField
                                id="account-input"
                                label="Registered Email Id"
                                variant="outlined"
                                className={classes.textFields}
                                required
                                error={err}
                                value={username}
                                onChange={(e) => setUser(e.target.value)}
                            />

                            <TextField
                                id="password-input"
                                label="Password"
                                type="password"
                                variant="outlined"
                                className={classes.textFields}
                                required
                                error={err}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" variant="contained" color="primary" className={classes.buttons} onClick={
                                () => {

                                    Meteor.loginWithPassword({username:username}, password, (e) => {
                                        if (e) {
                                            console.log("output : "+e+" : "+username+" : "+password)
                                            setErr(true)
                                        }
                                    })

                                    // if(Meteor.error){
                                    //     setErr(true)
                                    // }
                                }
                            }>
                                Login
                             </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

        </Paper >
    )
}