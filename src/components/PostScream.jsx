import React, {useEffect, useState} from 'react';
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import MyButton from "../utils/MyButton";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {CircularProgress} from "@material-ui/core";

import {postScream} from "../redux/actions/dataActions";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {CLEAR_ERRORS} from "../redux/types";

const useStyles = makeStyles({
  submitButton: {
    position: 'relative',
    margin: '10px 0'
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '6%',
  }
});

const PostScream = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [bodyScream, setBodyScream] = useState('');
  const {errors, isLoading} = useSelector(({UI}) => UI);

  useEffect(() => {
    if (errors === null) {
      setBodyScream('');
      handleClose();
    }
  }, [errors])

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    dispatch({type: CLEAR_ERRORS});
  }

  const handleChange = e => {
    setBodyScream(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(postScream({body: bodyScream}, handleClose));
    setBodyScream('');
  }

  return (
    <>
      <MyButton tip="Post a scream!" onClick={handleOpen}>
        <AddIcon/>
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
        <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!!"
              multiline
              rows="3"
              placeholder="Scream at your frends"
              error={!!errors?.msg}
              helperText={errors?.msg}
              className={classes.textField}
              onChange={handleChange}
              value={bodyScream}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={isLoading}
            >
              Submit
              {isLoading && <CircularProgress size={30} className={classes.progressSpinner}/>}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostScream;