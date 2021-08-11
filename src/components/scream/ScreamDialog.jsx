import React, {useEffect, useState} from 'react';
import MyButton from "../../utils/MyButton";
import dayjs from "dayjs";
import {Link} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {CircularProgress} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {getScream, clearErrors} from "../../redux/actions/dataActions";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import LikeButton from "./LikeButton";
import ChatIcon from "@material-ui/icons/Chat";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import {API_URL} from "../../config";

const useStyles = makeStyles({
  profileImage: {
    width: 200,
    height: 200,
    maxWidth: 200,
    maxHeight: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
});

const ScreamDialog = ({screamId, userId, openDialog}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {isLoading} = useSelector(({UI}) => UI);
  const {scream} = useSelector(({data}) => data);
  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState(window.location.pathname);

  useEffect(() => {
    if (openDialog) {
      handleOpen()
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpen = () => {
    const newPath = `/users/${userId}/screams/${screamId}`;

    if (oldPath === newPath) setOldPath(`/users/${userId}`);

    window.history.pushState(null, null, newPath);

    setOpen(true);
    dispatch(getScream(screamId));
  }

  const handleClose = () => {
    window.history.pushState(null, null, oldPath)
    setOpen(false);
    dispatch(clearErrors())
  }

  const dialogMarkup = isLoading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2}/>
    </div>

  ) : (
    <Grid container spacing={16}>
      <Grid item sm={5}>
        <img src={`${API_URL + scream?.user?.imageUrl}`} alt="profile" className={classes.profileImage}/>
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userId}`}
        >
          @{scream?.user?.name}
        </Typography>
        <hr className='invisibleSeparator'/>
        <Typography
          variant="body2"
          color="textSecondary"
        >
          {dayjs(scream?.createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className='invisibleSeparator'/>
        <Typography
          variant="body1"
        >
          {scream?.body}
        </Typography>
        <LikeButton scream={scream}/>
        <span>{scream?.likesCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary"/>
        </MyButton>
        <span>{scream?.commentsCount} comments</span>
      </Grid>
      <hr className='visibleSeparator'/>
      <Comments comments={scream?.comments}/>
      <CommentForm screamId={screamId} recipientId={userId}/>
    </Grid>
  )

  return (
    <>
      <MyButton
        onClick={handleOpen}
        tip="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {scream ? dialogMarkup : 'something went wrong...'}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ScreamDialog;