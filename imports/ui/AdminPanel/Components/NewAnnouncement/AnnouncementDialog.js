import React from 'react'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FormGroup } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0),
        flexGrow: 1,
        height: "100vh",
    },
    extendedIcon: {
        margin: theme.spacing(1),
        width: "20",
    },

    dateTime: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    formFroupContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    gridContainer: {
        alignItems: "flex-end",

        height: "100vh",
        margin: theme.spacing(0),
    },
    fabButton: {
        margin: theme.spacing(2)
    },
    input: {
        display: 'none',
    },
}));

export default (props) => {
    const classes = useStyles();
    const open = props.newDialogState;
    const handlePost = () => {
    props.handleClose()
   }

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleSwitchChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    return (
        

            <Dialog open={open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Make New Announcement</DialogTitle>
                <DialogContent>

                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="email"
                        fullWidth
                        helperText="Enter your Post's title here"
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="postBody"
                        label="Body"
                        type="email"
                        fullWidth
                        helperText="Write your Post here"
                        multiline
                        rowsMax={6}
                    />
                    <FormGroup row className={classes.formFroupContainer}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={state.checkedB}
                                    onChange={handleSwitchChange}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Event"
                        />
                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        <TextField
                            disabled

                            id="datetime-local"
                            label="Event Timings"
                            type="datetime-local"
                            defaultValue="2020-10-31T10:30"
                            className={classes.dateTime}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormGroup>

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                </Button>
                    <Button onClick={handlePost} color="primary">
                        Post
                </Button>
                </DialogActions>
            </Dialog>
    )
}