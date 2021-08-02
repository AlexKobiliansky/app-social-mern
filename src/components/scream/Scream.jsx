import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {API_URL} from '../../config';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {likeScream, unlikeScream} from "../../redux/actions/dataActions";
import MyButton from "../../utils/MyButton";
import ChatIcon from '@material-ui/icons/Chat';
import {useDispatch, useSelector} from "react-redux";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

const useStyles = makeStyles({
  card: {
    display: 'flex',
    marginBottom: 20,
    position: 'relative'
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
  const user = useSelector(({user}) => user);

  const deleteButton = user.authenticated && user.credentials._id === scream.user._id ? (
    <DeleteScream screamId={scream._id}/>
  ) : null

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
          {scream.user.name}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">{dayjs(scream.createdAt).fromNow()}</Typography>
        <Typography variant="body1" color="textSecondary">{scream.body}</Typography>
        <LikeButton scream={scream}/>
        <span>{scream.likesCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary"/>
        </MyButton>
        <span>{scream.commentsCount} comments</span>
        <ScreamDialog
          screamId={scream._id}
          userId={scream.user._id}
         />
      </CardContent>
    </Card>
  );
};

export default Scream;