import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import {Grid} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import {submitComment} from "../../redux/actions/dataActions";
import {useDispatch, useSelector} from "react-redux";
import socket from "../../utils/socket";
import {getUserNotifications} from "../../redux/actions/notificationActions";


const useStyles = makeStyles({
  textField: {
    marginBottom: 20
  }
});

const CommentForm = ({screamId, recipientId}) => {
  const classes = useStyles();
  const [body, setBody] = useState('');
  const {errors} = useSelector(({UI}) => UI);
  const {authenticated, credentials} = useSelector(({user}) => user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors === null) {
      setBody('');
    }
  }, [errors])

  const handleChange = e => {
    setBody(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const notificationData = {
      recipient: recipientId,
      sender: credentials._id,
      screamId: screamId,
      type: 'comment',
      read: false
    }

    dispatch(submitComment(screamId, {body: body}, notificationData))
    setBody('');
  }

  const handleCommentSocket = () => {
    dispatch(getUserNotifications())
  }

  useEffect(() => {
    socket.on('NEW_NOTIFICATION', handleCommentSocket)

    return () => {
      socket.removeListener('NEW_NOTIFICATION', handleCommentSocket)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{textAlign: 'center'}}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on Scream"
          error={!!errors?.msg}
          helperText={errors?.msg}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className="visibleSeparator"/>
    </Grid>
  ) : null


  return commentFormMarkup;
};

export default CommentForm;