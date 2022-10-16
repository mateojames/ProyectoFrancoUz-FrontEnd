import React, { useState } from "react"
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import { Link, useHistory } from "react-router-dom"
import { auth } from "../firebase"
import {
    signOut
  } from "firebase/auth";

export default function BarMenu(props) {
    const [error, setError] = useState("")
    const history = useHistory()

    const logout = () => signOut(auth);

    async function handleLogout() {
        setError("")

        try {
        await logout()
        history.push("/")
        } catch {
        setError("Error al cerrar sesión")
        }
    }

    function handleAdminUsers() {
        history.push("/usuarios")
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
        <MenuItem>
          <Avatar /> Perfil
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleAdminUsers}>
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          Administar Usuarios
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configuración
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>
  );
}
