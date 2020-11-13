import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import AnnouncementDialog from "../NewAnnouncement/AnnouncementDialog"


const useStyles = makeStyles((theme) => ({
    root: {
        flexFlow: 1,
        margin: theme.spacing(2)
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        flexGrow: 1,
        height: 400,
        margin: theme.spacing(1),
    },
}));

export default (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [cardState, setCardState] = React.useState({});


    const handleClose = () => {
        setOpen(false);

    }

    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <Card className={classes.root} variant="outlined">

            <CardHeader
                title={props.title}
                subheader={props.subheader}
            />

            <CardMedia
                className={classes.media}
                image={props.image}
                title={props.cardTypeTitle}
            />


            <CardContent>
                <Typography className={classes.pos} color="textSecondary">
                    {props.eventTimimng}
                </Typography>
                <Typography variant="body2" component="p">
                    {props.cardBody}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleOpen}>Edit</Button>
                <Button size="small">Delete</Button>
            </CardActions>
            <AnnouncementDialog handleClose={handleClose} newDialogState={open} />
        </Card>
    );
}
