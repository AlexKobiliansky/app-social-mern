import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import {getScreams} from "../redux/actions/dataActions";
import {useDispatch, useSelector} from "react-redux";
import ScreamSkeleton from "../utils/Skeletons/ScreamSkeleton";
import {getUserNotifications} from "../redux/actions/notificationActions";
import socket from "../utils/socket";
import {LIKE_SCREAM, SUBMIT_COMMENT, UPDATE_LIKES_ON_SCREAM} from "../redux/types";

const Home = () => {
  const dispatch = useDispatch();
  const {screams, isLoading} = useSelector(({data}) => data);

  useEffect(() => {
    dispatch(getScreams()) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newCommentOnScreamSocket = (data) => {
    dispatch({
      type: SUBMIT_COMMENT,
      payload: data
    });
  }

  const newLikeOnScreamSocket = (data) => {
    dispatch({
      type: UPDATE_LIKES_ON_SCREAM,
      payload: data
    });
  }

  const handleNotificationSocket = () => {
    dispatch(getUserNotifications())
  }

  useEffect(() => {
    // socket.on('NEW_NOTIFICATION', handleCommentSocket)
    socket.on('NEW_COMMENT_ON_SCREAM', (data) => newCommentOnScreamSocket(data))
    socket.on('UPDATE_LIKES_ON_SCREAM', (data) => newLikeOnScreamSocket(data))
    socket.on('NEW_NOTIFICATION', handleNotificationSocket)

    return () => {
      // socket.removeListener('NEW_NOTIFICATION', handleCommentSocket)
      socket.removeListener('NEW_COMMENT_ON_SCREAM', newCommentOnScreamSocket)
      socket.removeListener('UPDATE_LIKES_ON_SCREAM', newLikeOnScreamSocket)
      socket.removeListener('NEW_NOTIFICATION', handleNotificationSocket)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let recentScreamsMarkup = screams?.map(scream => <Scream key={scream._id} scream={scream}/>);
  return (
    <Grid container spacing={8}>
      <Grid item sm={8} xs={12}>
        {isLoading ? <ScreamSkeleton /> : recentScreamsMarkup}
      </Grid>

      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;