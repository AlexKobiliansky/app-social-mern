import React from 'react';
//material-ui
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
//images
import noAvatar from '../../images/no-avatar.png';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  cardContent: {
    width: '100%',
    flexDirection: 'column',
    padding: 25,
  },
  cover: {
    minWidth: 200,
    objectFit: 'cover'
  },
  name: {
    width: 60,
    height: 18,
    backgroundColor: '#3f51b5',
    marginBottom: 7
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    marginBottom: 10
  },
  fullLine: {
    height: 15,
    width: '90%',
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0, 0.6)'
  },
  halfLine: {
    height: 15,
    width: '50%',
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0, 0.6)'
  }
});

const ScreamSkeleton = () => {
  const classes = useStyles();

  const content = Array.from({length: 5}).map((_, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={noAvatar} />
      <CardContent className={classes.cardContent}>
        <div className={classes.name} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ))

  return {content}
};

export default ScreamSkeleton;