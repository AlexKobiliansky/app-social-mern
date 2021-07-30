import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import Scream from "../components/Scream";
import Profile from "../components/Profile";
import {getScreams} from "../redux/actions/dataActions";
import {useDispatch, useSelector} from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const {screams, isLoading} = useSelector(({data}) => data);

  useEffect(() => {
    dispatch(getScreams())
  }, []);

  let recentScreamsMarkup = screams?.map(scream => <Scream key={scream._id} scream={scream}/>);
  return (
    <Grid container spacing={8}>
      <Grid item sm={8} xs={12}>
        {isLoading ? 'Loading' : recentScreamsMarkup}
      </Grid>

      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;