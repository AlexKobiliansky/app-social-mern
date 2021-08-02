import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import {Grid} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import {submitComment} from "../../redux/actions/dataActions";
import {useDispatch, useSelector} from "react-redux";


const useStyles = makeStyles({
  textField: {
    marginBottom: 20
  }
});

const CommentForm = ({screamId}) => {
  const classes = useStyles();
  const [body, setBody] = useState('');
  const {errors, isLoading} = useSelector(({UI}) => UI);
  const {authenticated} = useSelector(({user}) => user);
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
    dispatch(submitComment(screamId, {body: body}))
    setBody('');
  }

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