import React, {useState} from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Link} from "react-router-dom";
import {markNotificationsRead} from "../../redux/actions/notificationActions";

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
//Icons
import NotificationIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import {useDispatch, useSelector} from "react-redux";

const Notifications = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const {notifications} = useSelector(({notifications}) => notifications);

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
    let unreadNotificationsIds = notifications.filter(not => !not.read).map(not => not._id)
    dispatch(markNotificationsRead(unreadNotificationsIds));
  }

  let notificationsIcon;

  if (notifications && notifications.length > 0) {
    notifications.filter(not => not.read === false).length > 0
      ? notificationsIcon = (
        <Badge
          badgeContent={notifications.filter(not => not.read === false).length}
          color="secondary"
        >
          <NotificationIcon/>
        </Badge>
      ) : (
        notificationsIcon = <NotificationIcon/>
      )
  } else {
    notificationsIcon = <NotificationIcon/>
  }

  dayjs.extend(relativeTime);

  let notificationsMarkup = notifications && notifications.length > 0 ? (
    notifications.map(not => {
      const verb = not.type === 'like' ? 'liked' : 'commented on';
      const time = dayjs(not.createdAt).fromNow();
      const iconColor = not.read ? 'primary' : 'secondary';
      const icon = not.type === 'like' ? (
        <FavoriteIcon color={iconColor} style={{marginRight: 10}}/>
      ) : (
        <ChatIcon color={iconColor} style={{marginRight: 10}}/>
      )

      return <MenuItem key={not.createdAt} onClick={handleClose}>
        {icon}
        <Typography
          component={Link}
          color="primary"
          variant="body1"
          to={`/users/${not.recipient._id}/screams/${not.screamId}`}
        >
          {not.sender.name} {verb} your scream {time}
        </Typography>
      </MenuItem>
    })
  ) : (
    <MenuItem onClick={handleClose}>
      You have no notifications yet
    </MenuItem>
  )

  return (
    <>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notificationsMarkup}
      </Menu>
    </>
  );
};

export default Notifications;