import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import axios from "axios";
import Scream from "../components/Scream";
import Profile from "../components/Profile";

const Home = () => {
  const [screams, setScreams] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/screams')
      .then(({data}) => {
        setScreams(data);

        setIsLoading(false)
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false)
      })
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