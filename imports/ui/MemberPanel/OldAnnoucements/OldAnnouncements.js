import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AnnoucementCard from './AnnoucementCard'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justify: "center",
    alignItem: "center",
    padding: theme.spacing(4),
    display: "block",

  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  // announcementDialog:{
  //   height: 0,
  //   width: 0,
  //   margin: 0,
  //   padding:0,
  // }
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

    <Grid container overflow="visible" className={classes.root} >
      <AnnoucementCard
        title="Event coming soon!"
        subheader="Posted on:September 14, 2016"
        image="/images/dummy.jpg"
        cardTypeTitle="Event"
        eventTiming="Event@ 10:30 A.M. 20-Novemeber-2020"
        cardBody=" Hello Everyone! We will be live soon. See you later!"
      />
      <AnnoucementCard
        title="Event coming soon!"
        subheader="Posted on:September 14, 2016"
        image="/images/dummy.jpg"
        cardTypeTitle="Event"
        eventTiming="Event@ 10:30 A.M. 20-Novemeber-2020"
        cardBody=" Hello Everyone! We will be live soon. See you later!"
      />
      <AnnoucementCard
        title="Event coming soon!"
        subheader="Posted on:September 14, 2016"
        image="/images/dummy.jpg"
        cardTypeTitle="Event"
        eventTiming="Event@ 10:30 A.M. 20-Novemeber-2020"
        cardBody=" Hello Everyone! We will be live soon. See you later!"
      />
      <AnnoucementCard
        title="Event coming soon!"
        subheader="Posted on:September 14, 2016"
        image="/images/dummy.jpg"
        cardTypeTitle="Event"
        eventTiming="Event@ 10:30 A.M. 20-Novemeber-2020"
        cardBody=" Hello Everyone! We will be live soon. See you later!"
      />
    </Grid>
  )
}