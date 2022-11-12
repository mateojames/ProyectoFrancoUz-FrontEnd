import React from "react"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import EventIcon from '@mui/icons-material/Event';
import { useHistory } from "react-router-dom"
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

export default function CalendarMenu(props) {
    const history = useHistory()

    function handleGrid() {
        history.push("/sesiones")
    }

    function handleCalendar() {
        history.push("/calendar")
    }

  return (
      <Menu
        anchorEl={props.anchorEl}
        id="account-menu"
        open={ (props.role === 'Sin asignar' || props.role === undefined) ? false : props.open}
        onClose={props.handleClose}
        onClick={props.handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleGrid}>
          <ListItemIcon>
            <ViewHeadlineIcon fontSize="small" />
          </ListItemIcon>
          Ver en Grilla
        </MenuItem>
        <MenuItem onClick={handleCalendar}>
          <ListItemIcon>
            <EventIcon fontSize="small" />
          </ListItemIcon>
          Ver en Calendario
        </MenuItem>
      </Menu>
  );
}
