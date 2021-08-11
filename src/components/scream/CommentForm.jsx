import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import {Grid} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import {submitComment, submitCommentAC} from "../../redux/actions/dataActions";
import {useDispatch, useSelector} from "react-redux";
import socket from "../../utils/socket";
import {getUserNotifications} from "../../redux/actions/notificationActions";
import {POST_SCREAM, SUBMIT_COMMENT} from "../../redux/types";


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


  const newCommentOnScreamSocket = (data) => {
    console.log('dispatch comment', data)
    dispatch({
      type: SUBMIT_COMMENT,
      payload: data
    });
  }

  useEffect(() => {
    // socket.on('NEW_NOTIFICATION', handleCommentSocket)
    socket.on('NEW_COMMENT_ON_SCREAM', (data) => newCommentOnScreamSocket(data))
    // socket.on('UPDATE_LIKES_ON_SCREAM', (data) => newLikeOnScreamSocket(data))
    // socket.on('NEW_NOTIFICATION', handleNotificationSocket)

    return () => {
      // socket.removeAllListeners()
      socket.off('NEW_COMMENT_ON_SCREAM');
      // socket.removeListener('UPDATE_LIKES_ON_SCREAM', newLikeOnScreamSocket)
      // socket.removeListener('NEW_NOTIFICATION', handleNotificationSocket)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{textAlign: 'center'}}>
      <form onSubmit={handleSubmit} style={{marginTop: 25}}>
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