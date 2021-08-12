import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
//components
import EditDetails from "./EditDetails";
import MyButton from "../../utils/MyButton";
import ProfileSkeleton from "../../utils/Skeletons/ProfileSkeleton";
//actions
import {logoutUser, uploadImage} from "../../redux/actions/userActions";
//material-ui
import {makeStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MuiLink from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography";
//icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';


const useStyles = makeStyles({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: 'primary'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
});

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authenticated = useSelector(({user}) => user.authenticated);
  const user = useSelector(({user}) => user.credentials);
  const isLoading = useSelector(({user}) => user.isLoading);

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    dispatch(uploadImage(formData));
  }

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  return (
    !isLoading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={user.imageUrl} alt={user.name} className="profile-image"/>
              <input type="file" id="imageInput" onChange={handleImageChange} hidden="hidden" />
              <MyButton tip="Edit profile picture" onClick={handleEditPicture} btnClassName="button">
                <EditIcon color="primary" />
              </MyButton>
            </div>
            <hr/>
            <div className="profile-details">
              <MuiLink component={Link} to={`/users/${user._id}`} color="primary" variant="h5">
                @{user.name}
              </MuiLink>
              <hr/>
              {user.bio && <Typography variant="body2">{user.bio}</Typography>}
              <hr/>
              {user.location && (
                <>
                  <LocationOnIcon color="primary"/>
                  <span>{user.location}</span>
                  <hr/>
                </>
              )}

              {user.website && (
                <>
                  <LinkIcon color="primary"/>
                  <span><a href={user.website} target="_blank" rel="noopener noreferrer">{' '}{user.website}</a></span>
                  <hr/>
                </>
              )}

              {<>
                  <CalendarTodayIcon color="primary"/>
                  {' '}
                  <span>Joined {dayjs(user.createdAt).format('MMM YYYY')}</span>
                </>}

              <hr/>
              <MyButton tip="Logout" onClick={handleLogout} btnClassName="button">
                <KeyboardReturnIcon color="primary" />
              </MyButton>

              <EditDetails />
            </div>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found, please login again
            <div className={classes.buttons}>
              <Button variant="contained" color="primary" component={Link} to="/login">
                Login
              </Button>
              <Button variant="contained" color="secondary" component={Link} to="/signup">
                Signup
              </Button>
            </div>
          </Typography>
        </Paper>
      )
    ) : (<ProfileSkeleton />)
  );
};

export default Profile;