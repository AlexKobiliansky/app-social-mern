import React, {useState} from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Link} from "react-router-dom";
import {markNotificationsRead} from "../../redux/actions/userActions";

import Button from '@material-ui/core/Button';
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
import {useDispatch} from "react-redux";

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      recipient: '60f543b5fcccd42869022678',
      sender: '60fc664af43e7855cf1a0070',
      createdAt: '2021-08-02T10:48:03.288+00:00',
      screamId: '6103db166a24c672421c0a5f',
      type: 'like',
      read: false,
      _id: '60f543b5fcccd42869022611'
    },
    {
      recipient: '60f543b5fcccd42869022678',
      sender: '60fc664af43e7855cf1a0070',
      createdAt: '2021-08-02T10:48:03.288+00:00',
      screamId: '6103db166a24c672421c0a5f',
      type: 'comment',
      read: true,
      _id: '60f543b5fcccd42869022611'
    }
  ]);
  const dispatch = useDispatch();


  const handleOpen = (e) => {
    setAnchorEl(e.target)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications.filter(not => !not.read).map(not => not._id)
    dispatch(markNotificationsRead(unreadNotificationsIds));
  }

  let notificationsIcon;

  if (notifications && notifications.length > 0) {
    notifications.filter(not => not.red === false).length > 0
      ? notificationsIcon = (
        <Badge
          badgeContent={notifications.filter(not => not.red === false).length}
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
          color="default"
          variant="body1"
          to={`/users/${not.recipient}/scream/${not.screamId}`}
        >
          {not.sender} {verb} your scream {time}
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
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </>
  );
};

export default Notifications;