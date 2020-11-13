import { Grid } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100vw",
        height: "100vh",
    }
}));
export default () => {
    const classes = useStyles();
    return (
        <Grid container className={classes.root} justify="center" alignItems="center" direction="column">
            <Grid item><img src="/images/logo_msmei.png" /></Grid>
        </Grid>
    );
}