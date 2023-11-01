import React, { useState, useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Modal, Snackbar } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import API from '../apiconfig'
import Chip from '@mui/material/Chip';
import {  Box, Button } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function ListItemMobile({ isDriver, driverID, apiData  }) {
    const [expanded, setExpanded] = React.useState(false);
    const [hover, setHover] = useState(false);
    const [openmodal, setOpenModal] = React.useState(false);
    const [driverOpen, setDriverOpen] = useState(false)
    const navigate = useNavigate()

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    useEffect(() => {
        console.log(driverID)
    },[])

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    function generateColorFromInitial(initial) {
        const colors = ['#ff5733', '#33ff57', '#5733ff', '#ff33d1', '#33a5ff', '#ffc933', "#FF5733", "#2AB3A6", "#C17A97", "#6EC4E8", "#A9D06E", "#F694C1", "#9F53C8", "#E1B135", "#4D9E66", "#EC7A44",];
        const charCode = initial.charCodeAt(0);
        const colorIndex = charCode % colors.length;


        return colors[colorIndex];
    }

    const driveRider = () => {
        console.log(apiData.riders.id)
        API.put(`/profiles/riders/${apiData.riders.id}/`, {
            profile: apiData.profiles.id,
            driver: driverID
        }).then((res) => {
            console.log(res.data)
            setDriverOpen(true)
        })
    }
    



    return (
        <div style={{
            display: "flex",
            margin: "10px",
            justifyContent: "center"
        }}>
            <Card sx={{ width: '90%', backgroundColor: 'white'}} >
                <CardHeader
                    avatar={
                        apiData.user.first_name ? 
                            (<Avatar aria-label="user" sx={{
                                backgroundColor: apiData.user.first_name ? generateColorFromInitial(apiData.user.first_name) : null
                            }}>
                                {apiData.user.first_name.charAt(0)}{apiData.user.last_name.charAt(0)}
                            </Avatar>) : <Avatar />
                    }
                    sx={{
                        color: '#454a4a',
                        "& .MuiCardHeader-subheader": {
                            color: 'black'
                        }
                    }}
                    title={apiData.user.first_name + ' ' + apiData.user.last_name}
                    subheader={apiData.user.email}
                />
                <CardMedia
                    component="img"
                    height="0"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary" style={{ color: '454a4a' }}>
                        Time:{apiData.posts.time}<br />
                        Frequency: {apiData.posts.frequency} <br />
                        Date: {apiData.posts.date} <br/>
                        Address: {apiData.profiles.address} <br/>
                        {
                                        apiData.user.id != JSON.parse(localStorage.getItem('user')).user_id ? (
                                            isDriver ? (
                                                <Chip
                                                    label="Drive this rider"
                                                    onClick={driveRider}
                                                    icon={<DriveEtaIcon />}
                                                    color="success"
                                                    variant={hover ? 'solid' : 'outlined'}
                                                    onMouseEnter={() => {
                                                        setHover(true);
                                                    }}
                                                    onMouseLeave={() => {
                                                        setHover(false);
                                                    }}
                                                />
                                            ) : (
                                                !!driverID ? 
                                                null
                                                :
                                                <Typography variant="h8" color="primary" style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => {
                                                    setOpenModal(true)
                                                }}>
                                                    Want to drive? Click here to become a driver
                                                </Typography>
                                            )
                                        ) : null
                                    }


                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Typography style={{ color: '454a4a'}}>View additional info:</Typography>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon style={{ color: '454a5a'}}/>
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography style={{ color: '454a4a' }}>{apiData.posts.additional_info}</Typography>
                    </CardContent>
                </Collapse>
            </Card>

            <Modal
                open={openmodal}
                onClose={() => {
                    setOpenModal(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Become a Driver?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Make a new account as a driver?
                    </Typography>
                    <Button variant="outlined" sx={{ marginTop: '10px' }} onClick={() => {
                        setOpenModal(false)
                        navigate('/signup')
                    }}>Continue to Sign up</Button>
                </Box>
            </Modal>

            <Snackbar open={driverOpen} autoHideDuration={6000} onClose={() => {
                setDriverOpen(false)
            }}>
                <Alert onClose={() => {
                setDriverOpen(false)
                }} severity="success" sx={{ width: '100%' }}>
                    You are now driving {apiData.user.first_name} {apiData.user.last_name}
                </Alert>
            </Snackbar>
        </div>

    );
}