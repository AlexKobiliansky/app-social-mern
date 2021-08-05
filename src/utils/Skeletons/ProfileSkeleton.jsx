import React from 'react';
import noAvatar from '../../images/no-avatar.png';

import Paper from '@material-ui/core/Paper';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import {makeStyles} from '@material-ui/core/styles';

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
  },
  name: {
    width: 120,
    height: 18,
    backgroundColor: '#3f51b5',
    margin: '0 auto'
  },
  fullLine: {
    height: 15,
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0, 0.6)'
  }
});

const ProfileSkeleton = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={noAvatar} alt="profile" className="profile-image"/>
        </div>
        <hr/>
        <div className="profile-details">
          <div className={classes.name} />
          <hr/>
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr/>
          <LocationOnIcon color="primary"/><span>Location</span>
          <hr/>
          <LinkIcon color="primary"/> https://website.com
          <hr/>
          <CalendarTodayIcon color="primary"/> Joined date
        </div>
      </div>
    </Paper>
  );
};

export default ProfileSkeleton;