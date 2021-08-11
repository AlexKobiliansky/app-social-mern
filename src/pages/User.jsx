import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import {getUserData} from "../redux/actions/dataActions";
import {useDispatch, useSelector} from "react-redux";
import {instance} from "../api";
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import ScreamSkeleton from "../utils/Skeletons/ScreamSkeleton";
import ProfileSkeleton from "../utils/Skeletons/ProfileSkeleton";

const User = (props) => {
  const dispatch = useDispatch();
  const {screams, isLoading} = useSelector(({data}) => data);
  const [profile, setProfile] = useState(null);
  const [screamIdParam, setScreamIdParam] = useState(null);

  useEffect(() => {
    const screamId = props.match.params.screamId;

    if (screamId) setScreamIdParam(screamId);

    const id = props.match.params.id;
    dispatch(getUserData(id));
    instance.get(`user/${id}`)
      .then(({data}) => {
        setProfile(data.user)
      })
      .catch(err => console.log(err)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const screamsMarkup = screams === null ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    // eslint-disable-next-line array-callback-return
    screams.map(scream => {
      if (profile?._id === scream.user._id) return <Scream key={scream._id} scream={scream}/>
    })
  ) : (
    // eslint-disable-next-line array-callback-return
    screams.map(scream => {
      if (profile?._id === scream.user._id)
      {
        if (scream._id !== screamIdParam)
          return <Scream key={scream._id} scream={scream}/>
        else
          return <Scream key={scream._id} scream={scream} openDialog/>
      }
    })
  )

  return (
    <Grid container spacing={8}>
      <Grid item sm={8} xs={12}>
        {isLoading ? <ScreamSkeleton /> : screamsMarkup}
      </Grid>

      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <ProfileSkeleton />
        ) : <StaticProfile profile={profile}/>}
      </Grid>
    </Grid>
  );
};

export default User;