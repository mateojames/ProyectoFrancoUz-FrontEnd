import React, {useState, useEffect } from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LogoFrancoUz from '../images/logoFrancoUz.png';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../store/actions/modal';
import { useHistory } from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Tooltip from '@mui/material/Tooltip';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BarMenu from "./BarMenu";
import NotificationsMenu from "./Notifications";
import { loadNotifications } from "../store/actions/loadNotifications";

const drawerWidth = 240;

const ResponsiveAppBar = (props) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    
    const currentUser = useSelector(state => state.auth.currentUser);
    const notifications = useSelector(state => state.notification.notifications);
    const pendingNotifications = notifications.filter((notification => notification.read === false))
    const history = useHistory()

     const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
        console.log(mobileOpen)
    };

    const handleCalendarClicked = () => {
        history.push("/calendar")
    };

    const dispatch = useDispatch();
    const handleLoginClicked = () => {
        dispatch(showModal())
    };

    const [anchorMenu, setAnchorMenu] = useState(null);
    const openMenu = Boolean(anchorMenu);
    const handleMenuClick = (event) => {
        setAnchorMenu(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorMenu(null);
    };

    const [anchorNotificationsMenu, setAnchorNotificationsMenu] = useState(null);
    const openNotificationsMenu = Boolean(anchorNotificationsMenu);
    const handleNotificationsMenuClick = (event) => {
        setAnchorNotificationsMenu(event.currentTarget);
    };
    const handleNotficationsMenuClose = () => {
        setAnchorNotificationsMenu(null);
    };

    useEffect(() => {
        if(currentUser){
            dispatch(loadNotifications())
        }

      }, [currentUser]);


    var authWebOptions = (
        <Box sx={{ display:'flex'}}>
                        <Button sx={{ my: 2, color: 'white', display: { xs: 'block', md: 'block' } }} onClick={handleLoginClicked}>
                           Ingresar
                        </Button>
                        <Button sx={{ my: 2, color: 'white', display: { xs: 'none', md: 'block' } }} >
                        Conozcanos
                        </Button>
                        <Button sx={{ my: 2, color: 'white',display: { xs: 'none', md: 'block' } }}>
                            Historia
                        </Button>
        </Box>
        
    );
    if(currentUser){
        authWebOptions = (
            <Box sx={{ display: { xs: 'flex', md: 'flex' }, justifyContent: 'space-around' }}>
                        <Tooltip title="Notificaciones">
                            <IconButton color="inherit" sx={{ mr: 3 }} onClick={handleNotificationsMenuClick}>
                                <Badge badgeContent={pendingNotifications.length} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                         </Tooltip>
                        <Tooltip title="Calendario">
                            <IconButton onClick={handleCalendarClicked} color="inherit" sx={{ mr: 2 }}>
                                <InsertInvitationIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Opciones de Usuario">
                            <IconButton onClick={handleMenuClick} color="inherit" sx={{ mr: 0 }}>
                                <ManageAccountsIcon />
                            </IconButton>
                        </Tooltip>
            </Box>
        );
    }

    var authMobileOptions = (
        <List>
            <ListItem key={1} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}  onClick={handleLoginClicked}>
                    <ListItemText>Ingresar</ListItemText>
                </ListItemButton>
        </ListItem>
        <ListItem key={2} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText>Conozcanos</ListItemText>
            </ListItemButton>
        </ListItem>
        <ListItem key={3} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText>Historia</ListItemText>
            </ListItemButton>
        </ListItem>
    </List>
    );
    if(currentUser){
        authMobileOptions = (
            <List>
            <ListItem key={1} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}  onClick={handleCalendarClicked}>
                    <ListItemText>Calendario</ListItemText>
                </ListItemButton>
        </ListItem>
    </List>
        );
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Asociación Franco Uz
            </Typography>
            <Divider />
            {authMobileOptions}
        </Box>
    );

    


    return (
        <>
            <Box sx={{ display: 'flex'}}>
                <AppBar position="static">
                <Container maxWidth="xxl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={handleDrawerToggle}
                            >
                                <img src={LogoFrancoUz} alt="LogoFrancoUz" style={{maxWidth: 40, marginRight: '10px', borderRadius: 20}} />
                            </IconButton>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, mr: 2 }} >
                            <Box container alignItems="center" justifyContent="center" display="flex" flexDirection="row">
                                <img src={LogoFrancoUz} alt="LogoFrancoUz" style={{maxWidth: 40, marginRight: '10px', borderRadius: 20}} />
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    mr: 2,
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    }}
                                    onClick={() => history.push("/")}
                                >
                                    Asociación Franco Uz
                                </Typography>
                            </Box>
                        </Box>
                        {authWebOptions}

                    </Toolbar>

                </Container>
                </AppBar>
                <Box component="nav">
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        >
                        {drawer}
                    </Drawer>
                </Box>
            </Box>
            <BarMenu open={openMenu} handleClose={handleMenuClose} handleClick={handleMenuClick} anchorEl={anchorMenu} role={props.role}/>
            <NotificationsMenu open={openNotificationsMenu} handleClose={handleNotficationsMenuClose} handleClick={handleNotificationsMenuClick} anchorEl={anchorNotificationsMenu} role={props.role}/>
        </>
    );
};
export default ResponsiveAppBar;
