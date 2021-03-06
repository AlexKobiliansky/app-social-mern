import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import socket from "../utils/socket";
//components
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import ScreamSkeleton from "../utils/Skeletons/ScreamSkeleton";
//actions
import {getScreams, submitCommentAC, updateLikesAC} from "../redux/actions/dataActions";
import {getUserNotifications} from "../redux/actions/notificationActions";
import {UPDATE_LIKES_ON_SCREAM, NEW_NOTIFICATION} from "../redux/types";
//material-ui
import Grid from "@material-ui/core/Grid";


const Home = () => {
  const dispatch = useDispatch();
  const {screams, isLoading} = useSelector(({data}) => data);

  useEffect(() => {
    dispatch(getScreams()); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newLikeOnScreamSocket = (data) => {
    dispatch(updateLikesAC(data));
  }

  const handleNotificationSocket = () => {
    dispatch(getUserNotifications());
  }

  const newCommentOnScreamSocket = (data) => {
    dispatch(submitCommentAC(data));
  }

  useEffect(() => {
    socket.on(UPDATE_LIKES_ON_SCREAM, (data) => newLikeOnScreamSocket(data))
    socket.on(NEW_NOTIFICATION, handleNotificationSocket)
    socket.on('NEW_COMMENT_ON_SCREAM', (data) => newCommentOnScreamSocket(data))

    return () => {
      socket.off(UPDATE_LIKES_ON_SCREAM, newLikeOnScreamSocket)
      socket.off(NEW_NOTIFICATION, handleNotificationSocket)
      socket.off('NEW_COMMENT_ON_SCREAM');
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