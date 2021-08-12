import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
//components
import MyButton from "../../utils/MyButton";
//actions
import {likeScream, unlikeScream} from "../../redux/actions/dataActions";
//icons
import {FavoriteBorder} from "@material-ui/icons";
import FavoriteIcon from "@material-ui/icons/Favorite";


const LikeButton = ({scream}) => {
  const dispatch = useDispatch();
  const user = useSelector(({user}) => user);

  const likedScream = () => {
    return !!(user.likes && user.likes.find(like => like.scream === scream._id));
  };

  const handleLikeScream = () => {
    const postData = {
      recipient: scream.user._id,
      sender: user.credentials._id,
      screamId: scream._id,
      type: 'like',
      read: false
    }

    dispatch(likeScream(scream._id, postData));
  }

  const handleUnlikeScream = () => {
    dispatch(unlikeScream(scream._id));
  }

  return !user.authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary"/>
      </MyButton>
    </Link>
  ) : (
    likedScream() ? (
      <MyButton tip="Undo Like" onClick={handleUnlikeScream}>
        <FavoriteIcon color="primary"/>
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={handleLikeScream}>
        <FavoriteBorder color="primary"/>
      </MyButton>
    )
  )
};

export default LikeButton;