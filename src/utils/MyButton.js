import React from 'react';
import {IconButton} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

const MyButton = ({children, onClick, tip, btnClassName, tipClassName }) => (
  <Tooltip title={tip} placement="top" className={tipClassName}>
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
);

export default MyButton;