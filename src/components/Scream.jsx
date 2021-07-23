import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {API_URL} from '../config';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }

});

const Scream = ({scream}) => {
  const classes = useStyles();

  dayjs.extend(relativeTime);

  return (
    <Card className={classes.card}>
      <CardMedia
        image={`${API_URL + scream.user.imageUrl}`}
        title={"Profile image"}
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${scream.user._id}`}
          color="primary"
        >
          {scream.user.email}
        </Typography>
        <Typography variant="body2" color="textSecondary">{dayjs(scream.createdAt).fromNow()}</Typography>
        <Typography variant="body1" color="textSecondary">{scream.body}</Typography>

      </CardContent>
    </Card>
  );
};

export default Scream;