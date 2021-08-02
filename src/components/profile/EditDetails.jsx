import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {editUserDetails} from "../../redux/actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MyButton from "../../utils/MyButton";

const useStyles = makeStyles({

});

const EditDetails = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    bio: '',
    website: '',
    location: ''
  });
  const [openDialog, setOpenDialog] = useState(false);
  const credentials = useSelector(({user}) => user.credentials);
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData({
      bio: credentials?.bio,
      website: credentials?.website,
      location: credentials?.location,
    })
  }, []);

  const handleOpen = () => {
    setOpenDialog(true);
  }

  const handleClose = () => {
    setOpenDialog(false);
  }

  const handleChangeForm = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }

  const handleSubmit = () => {
    const userDetails = {
      bio: formData.bio,
      website: formData.website,
      location: formData.location,
    }

    dispatch(editUserDetails(userDetails));
    handleClose();
  }

  return (
    <>
      <MyButton tip="Edit details" onClick={handleOpen} btnClassName={classes.button}>
        <EditIcon color="primary" />
      </MyButton>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={formData.bio}
              onChange={handleChangeForm}
              fullWidth
            />

            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal website"
              className={classes.textField}
              value={formData.website}
              onChange={handleChangeForm}
              fullWidth
            />

            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where are you from"
              className={classes.textField}
              value={formData.location}
              onChange={handleChangeForm}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditDetails;