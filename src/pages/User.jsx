import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import {getUserData} from "../redux/actions/dataActions";
import {useDispatch, useSelector} from "react-redux";
import {instance} from "../api";
import Profile from "../components/profile/Profile";
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";

const User = (props) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const {screams, isLoading} = useSelector(({data}) => data);

  useEffect(() => {
    const id = props.match.params.id;
    dispatch(getUserData(id));
    instance.get(`user/${id}`)
      .then(({data}) => {
        setProfile(data.user)
      })
      .catch(err => console.log(err));
  }, []);

  const screamsMarkup = screams === null ? (
    <p>No screams from this user</p>
  ) : (
    screams.map(scream => <Scream key={scream._id} scream={scream} />)
  )

  return (
    <Grid container spacing={8}>
      <Grid item sm={8} xs={12}>
        {isLoading ? 'Loading' : screamsMarkup}
      </Grid>

      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <p>Loading profile...</p>
        ) : <StaticProfile profile={profile}/>}
      </Grid>
    </Grid>
  );
};

export default User;