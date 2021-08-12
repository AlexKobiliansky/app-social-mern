import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
//actions
import {submitComment} from "../../redux/actions/dataActions";
//material-ui
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles({
  textField: {
    marginBottom: 20
  }
});

const CommentForm = ({screamId, recipientId}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {errors} = useSelector(({UI}) => UI);
  const {authenticated, credentials} = useSelector(({user}) => user);
  const [body, setBody] = useState('');

  useEffect(() => {
    if (errors === null) {
      setBody('');
    }
  }, [errors])

  const handleChange = e => {
    setBody(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();
    const notificationData = {
      recipient: recipientId,
      sender: credentials._id,
      screamId: screamId,
      type: 'comment',
      read: false
    }

    dispatch(submitComment(screamId, {body: body}, notificationData));
    setBody('');
  }

  return authenticated ? (
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
        >
          Submit
        </Button>
      </form>
    </Grid>
  ) : null;
};

export default CommentForm;