import React, { useEffect, useState } from "react"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { MenuList } from "@mui/material";
import Typography from "./Typography";
import { notificationRead } from "../store/actions/notificationRead";


export default function NotificationsMenu(props) {
    const history = useHistory()
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const dispatch = useDispatch()
    const notifications = useSelector(state => state.notification.notifications);
    const appointments = useSelector(state => state.calendar.appointments)
    const handleNotificationClicked = (data) => {
        if(data.read === false){
            dispatch(notificationRead(data.id))
        }
        history.push({
            pathname: "/calendar",
            state: {...data.appointment}
          })
    }

    let notificationsList = (
            <MenuList sx={{maxWidth: {xs: windowSize.innerWidth / 1.8, md: windowSize.innerWidth / 3, lg:windowSize.innerWidth / 5}, maxHeight: windowSize.innerHeight / 2.2, overflow:'auto'}}>
                        <MenuItem style={{whiteSpace: "normal", display: 'flex', flexDirection: 'column'}}>
                            <Typography sx={{fontStyle: 'italic'}}>No hay notificaciones para mostrar</Typography>
                        </MenuItem>

             </MenuList>
        )

    if(notifications.length > 0){
        notificationsList = (
            <MenuList sx={{maxWidth: {xs: windowSize.innerWidth / 1.8, md: windowSize.innerWidth / 3, lg:windowSize.innerWidth / 5}, maxHeight: windowSize.innerHeight / 2.2, overflow:'auto'}}>
                {notifications.map((item) => {
                    const appointment = appointments.find(session => session.id === item.appointment)
                    const backgroungColor = item.read ? 'none' : '#EAEDED'
                    return (
                        <MenuItem divider style={{whiteSpace: "normal", display: 'flex', flexDirection: 'column', backgroundColor: backgroungColor, }} onClick={() => handleNotificationClicked({...item, appointment: appointment})}>
                            <Typography  gutterBottom={false}>
                            <span style={{fontStyle:'italic'}}>{item.trigger.name}</span>
                            <span >{item.description}</span>
                            <span style={{fontWeight:'bold'}}>{(appointment ? appointment.title : '')}</span>
                            </Typography>
                            <Typography sx={{fontStyle: 'italic', ml:10}}>{item.date}</Typography>
                        </MenuItem>
                    )
                })}
             </MenuList>
        )
    }

        function getWindowSize() {
            const {innerWidth, innerHeight} = window;
            return {innerWidth, innerHeight};
          }
        
          useEffect(() => {
            function handleWindowResize() {
              setWindowSize(getWindowSize());
            }
        
            window.addEventListener('resize', handleWindowResize);
        
            return () => {
              window.removeEventListener('resize', handleWindowResize);
            };
          }, []);    
    

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
        {notificationsList}
      </Menu>
  );
}
