import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Avatar, Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { generateColorFromInitial } from './ListItem';

const drawerWidth = 240;
const navItems = ['Sign up', 'Log in'];
const authNavItems = ["Dashboard", "Log out", "Profile"];

function NavBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    useEffect(() => {
        console.log("badgecontent",props.badgeContent)
        
    },[])

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }} >
            <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }} onClick={() => { navigate('/') }}>
                StudentRoutes
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} sx={{ fontWeight: 'bold' }}
                                onClick={() => {
                                    switch (item) {
                                        case "Sign up":
                                            navigate('/signup')
                                            break;
                                        case "Log in":
                                            navigate('/login');
                                            break
                                    }


                                }}
                            /> 
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const authDrawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }} >
            <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }} onClick={() => { navigate('/') }}>
                StudentRoutes
            </Typography>
            <Divider />
            <List>
                {authNavItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} sx={{ fontWeight: 'bold' }}

                                onClick={() => {
                                    switch (item) {
                                        case "Dashboard":
                                            navigate('/signup')
                                            break;
                                        case "Driver Matches":
                                            navigate('/matches');
                                            break;
                                        case "Log out":
                                            ['auth', 'user', 'profile'].forEach((item) => {localStorage.removeItem(item)})
                                            navigate('/')
                                            break;
                                        case "Profile":
                                            navigate(`/profile/${JSON.parse(localStorage.getItem('user')).user_id}`)
                                            break;
                                    }


                                }}
                            />
                            {item === 'Profile' ? 
                            <Badge badgeContent={props.badgeContent} color="secondary">
                                <MailIcon />
                            </Badge> : null}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => { navigate('/') }}
                    >
                        StudentRoutes
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' }, }}>
                        {!props.auth ? (
                            // Code to render when condition is true
                            navItems.map((item) => (
                                <Button
                                    key={item}
                                    sx={{
                                        color: item === "Sign up" ? 'black' : '#fff',
                                        fontWeight: 'bold',
                                        backgroundColor: item === "Sign up" ? 'white' : 'black',
                                        margin: '10px',
                                        width: '100px',
                                        padding: '5px',
                                        marginRight: item === "Sign up" ? "0px" : "0px",
                                    }}
                                    onClick={() => {
                                        switch (item) {
                                            case "Sign up":
                                                navigate('/signup')
                                                break;
                                            case "Log in":
                                                navigate('/login');
                                                break
                                        }


                                    }}


                                >
                                    {item}
                                </Button>
                            ))
                        ) : (
                            authNavItems.map((item) => (
                                <Button
                                    key={item}
                                    sx={{
                                        color: item === "Sign up" ? 'black' : '#fff',
                                        fontWeight: 'bold',
                                        backgroundColor: item === "Profile" ? 'none' : 'black',
                                        margin: '10px',
                                        width: '100px',
                                        padding: '5px',
                                        marginRight: item === "Sign up" ? "0px" : "0px",
                                    }}
                                    onClick={() => {
                                        switch (item) {
                                            case "Dashboard":
                                                navigate('/dashboard')
                                                break;
                                            case "Driver Matches":
                                                navigate('/matches');
                                                break;
                                            case "Profile":
                                                navigate(`/profile/${JSON.parse(localStorage.getItem('user')).user_id}`)
                                                break;
                                            case "Log out":
                                                ['auth', 'user', 'profile'].forEach((item) => {localStorage.removeItem(item)})
                                                navigate('/')
                                                break;
                                        }


                                    }}

                                >
                                    {item === 'Profile' ? (
                                        <Badge badgeContent={props.badgeContent} color="secondary">
                                            <Avatar sx={{
                                                width: '40px',
                                                height: '40px',
                                                backgroundColor : props.firstName ? generateColorFromInitial(props.firstName[0]) : null
                                            }}>
                                                { props.firstName && props.lastName ? props.firstName[0]+props.lastName[0] : null}
                                            </Avatar>
                                        </Badge>
                                    ) : (
                                        <span>{item}</span>
                                    )}






                                </Button>
                            ))
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {props.auth ? authDrawer : drawer}
                </Drawer>
            </nav>
        </Box>
    );
}

NavBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default NavBar;