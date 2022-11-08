import React, { useState } from "react"
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import Logout from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import { Link, useHistory } from "react-router-dom"
import { auth } from "../firebase"
import {
    signOut
  } from "firebase/auth";
import { MenuList } from "@mui/material";

export default function HeaderMenu(props) {
    const [error, setError] = useState("")
    const history = useHistory()
    console.log('end date: ', new Date(props.appointment.endDate))


    function handleHeaderFinalizarClicked() {
        props.handleFinalizar()
    }

    function handleHeaderCancelarClicked() {
        props.handleCancelar()
    }

    var items = (<MenuList>
        <MenuItem onClick={handleHeaderCancelarClicked}>
          <ListItemIcon>
            <EventBusyIcon fontSize="small" />
          </ListItemIcon>
          Cancelar
        </MenuItem>
        </MenuList>)

    if(props.role === 'profesional' && new Date() > new Date(props.appointment.endDate)){
        items = (<MenuList>
            <MenuItem onClick={handleHeaderFinalizarClicked}>
              <ListItemIcon>
                <DomainVerificationIcon fontSize="small" />
              </ListItemIcon>
              Finalizar
            </MenuItem>
        </MenuList>)
    }

  return (
      <Menu
        anchorEl={props.anchorEl}
        id="account-menu"
        open={props.open}
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
        {items}
      </Menu>
  );
}
