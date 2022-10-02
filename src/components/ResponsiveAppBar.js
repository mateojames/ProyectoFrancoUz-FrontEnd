import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LogoFrancoUz from '../images/logoFrancoUz.png';
import { useDispatch } from 'react-redux';
import { showModal } from '../store/actions/modal';
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"

const drawerWidth = 240;

const ResponsiveAppBar = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { currentUser, updatePass } = useAuth()
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
    var authWebOptions = (
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleLoginClicked}>
                           {currentUser ? 'Bokita' : 'Ingresar'} 
                        </Button>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} >
                        Conozcanos
                        </Button>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                            Historia
                        </Button>
        </Box>
    );
    if(currentUser){
        authWebOptions = (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleCalendarClicked}>
                           Calendario
                        </Button>
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
                <ListItemButton sx={{ textAlign: 'center' }}  onClick={handleLoginClicked}>
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
                        <MenuIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, mr: 2 }} >
                        <Box container alignItems="center" justifyContent="center" display="flex" flexDirection="row">
                            <img src={LogoFrancoUz} alt="Kitty Katty!" style={{maxWidth: 40, marginRight: '10px'}} />
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                display: { xs: 'none', md: 'flex' },
                                mr: 2,
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                }}
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
    );
};
export default ResponsiveAppBar;
