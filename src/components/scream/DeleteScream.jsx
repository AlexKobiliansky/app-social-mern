import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MyButton from "../../utils/MyButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import {DeleteOutline} from "@material-ui/icons";

import {deleteScream} from '../../redux/actions/dataActions';
import {useDispatch} from "react-redux";
import {getUserNotifications} from "../../redux/actions/notificationActions";
import socket from "../../utils/socket";
import {DELETE_SCREAM} from "../../redux/types";

const useStyles = makeStyles({
  deleteButton: {
    top: '10%',
    left: '90%',
    position: 'absolute',
  }
});

const DeleteScream = ({screamId}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleDeleteScream = () => {
    dispatch(deleteScream(screamId));
    setOpen(false);
  }

  const handleDeleteSocket = (screamId) => {
    dispatch(deleteScream(screamId));
  }

  useEffect(() => {
    socket.on('DELETE_SCREAM', (screamId) => handleDeleteSocket(screamId))

    return () => {
      socket.off('DELETE_SCREAM');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>
    <MyButton tip="Delete Scream" onClick={handleOpen} btnClassName={classes.deleteButton}>
      <DeleteOutline color="secondary" />
    </MyButton>
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Are you sure you want to delete this scream?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleDeleteScream} color="secondary">Delete</Button>
      </DialogActions>
    </Dialog>
    </>;
};

export default DeleteScream;