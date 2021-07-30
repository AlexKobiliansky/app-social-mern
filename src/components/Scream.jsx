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
import {likeScream, unlikeScream} from "../redux/actions/dataActions";
import MyButton from "../utils/MyButton";
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {FavoriteBorder} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import DeleteScream from "./DeleteScream";

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
  const dispatch = useDispatch();
  const user = useSelector(({user}) => user);

  const likedScream = () => {
    return !!(user.likes && user.likes.find(like => like.scream === scream._id));
  };

  const handleLikeScream = () => {
    dispatch(likeScream(scream._id))
  }

  const handleUnlikeScream = () => {
    dispatch(unlikeScream(scream._id))
  }

  const likeButton = !user.authenticated ? (
    <MyButton tip="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
    ) : (
      likedScream() ? (
        <MyButton tip="Undo Like" onClick={handleUnlikeScream}>
          <FavoriteIcon color="primary" />
        </MyButton>
      ) : (
        <MyButton tip="Like" onClick={handleLikeScream}>
          <FavoriteBorder color="primary" />
        </MyButton>
      )
  );

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
        {likeButton}
        <span>{scream.likesCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary"/>
        </MyButton>
        <span>{scream.commentsCount} comments</span>
      </CardContent>
    </Card>
  );
};

export default Scream;