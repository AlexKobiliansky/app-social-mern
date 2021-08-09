import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import {getScreams} from "../redux/actions/dataActions";
import {useDispatch, useSelector} from "react-redux";
import ScreamSkeleton from "../utils/Skeletons/ScreamSkeleton";
import {getUserNotifications} from "../redux/actions/notificationActions";
import socket from "../utils/socket";

const Home = () => {
  const dispatch = useDispatch();
  const {screams, isLoading} = useSelector(({data}) => data);

  useEffect(() => {
    dispatch(getScreams()) // eslint-disable-next-line react-hooks/exhaustive-deps
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