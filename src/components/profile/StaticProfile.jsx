import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import dayjs from "dayjs";
import Link from '@material-ui/core/Link';
import {Paper} from "@material-ui/core";
import {Typography} from "@material-ui/core";

import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import MuiLink from "@material-ui/core/Link";
import {API_URL} from "../../config";

const useStyles = makeStyles({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
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
    }
  }
});

const StaticProfile = ({profile}) => {

  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={`${API_URL + profile.imageUrl}`} alt={profile.name} className="profile-image"/>
        </div>
        <hr/>
        <div className="profile-details">
          <MuiLink component={Link} to={`/users/${profile._id}`} color="primary" variant="h5">
            @{profile.name}
          </MuiLink>
          <hr/>
          {profile.bio && <Typography variant="body2">{profile.bio}</Typography>}
          <hr/>
          {profile.location && (
            <>
              <LocationOnIcon color="primary"/>
              <span>{profile.location}</span>
              <hr/>
            </>
          )}

          {profile.website && (
            <>
              <LinkIcon color="primary"/>
              <span><a href={profile.website} target="_blank" rel="noopener noreferrer">{' '}{profile.website}</a></span>
              <hr/>
            </>
          )}

          {<>
            <CalendarTodayIcon color="primary"/>
            {' '}
            <span>Joined {dayjs(profile.createdAt).format('MMM YYYY')}</span>
          </>}

          <hr/>
        </div>
      </div>
    </Paper>
  );
};

export default StaticProfile;