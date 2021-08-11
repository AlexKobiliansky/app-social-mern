import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import {API_URL} from "../../config";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
  commentImage: {
    maxWidth: '100%',
    width: 100,
    height: 100,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  commentData: {
    marginLeft: 20
  },
  comment: {
    marginBottom: 20
  }
});

const Comments = () => {
  const classes = useStyles();
  const comments = useSelector(({data}) => data.currentScreamComments);
  return (
    <Grid container>
      {comments?.map((comment, index) => {
        return (
          <Grid item sm={12} key={comment._id} className={classes.comment}>
            <Grid container>
              <Grid item sm={2}>
                <img src={`${API_URL + comment.user.imageUrl}`} alt="profile" className={classes.commentImage}/>
              </Grid>

              <Grid item sm={9}>
                <div className={classes.commentData}>
                  <Typography
                    variant="h5"
                    component={Link}
                    to={`users/${comment.user._id}`}
                    color="primary"
                  >
                    {comment.user.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    {dayjs(comment.createdAt).format('h:mm a, MMMM DD YYYY')}
                  </Typography>

                  <hr className='visibleSeparator' style={{marginBottom: 0}}/>

                  <Typography
                    variant="body1"
                  >
                    {comment.body}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        // {(index !== comments.length-1) && <hr className="visibleSeparator"/>}
        )

      })}
    </Grid>
  );
};

export default Comments;