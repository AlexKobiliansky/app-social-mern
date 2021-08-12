import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

import socket from "../../utils/socket";
import {DELETE_SCREAM} from "../../redux/types";
//components
import MyButton from "../../utils/MyButton";
//actions
import {deleteScream, deleteScreamAC} from '../../redux/actions/dataActions';
//material-ui
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
//icons
import {DeleteOutline} from "@material-ui/icons";


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
    dispatch(deleteScreamAC(screamId));
  }

  useEffect(() => {
    socket.on(DELETE_SCREAM, (screamId) => handleDeleteSocket(screamId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MyButton tip="Delete Scream" onClick={handleOpen} btnClassName={classes.deleteButton}>
        <DeleteOutline color="secondary"/>
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Are you sure you want to delete this scream?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleDeleteScream} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default DeleteScream;