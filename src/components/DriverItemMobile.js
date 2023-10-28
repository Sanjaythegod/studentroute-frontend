import React, { useState, useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelIcon from '@mui/icons-material/Cancel';
import API from '../apiconfig'
import Chip from '@mui/material/Chip';


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

export default function DriverItemMobile({ data  }) {
    const [expanded, setExpanded] = React.useState(false);
    const [moreinfo, showMoreInfo] = useState(false)
    const [hover, setHover] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const showFullDescription = (description) => {
        showMoreInfo(true);
    };
    function generateColorFromInitial(initial) {
        const colors = ['#ff5733', '#33ff57', '#5733ff', '#ff33d1', '#33a5ff', '#ffc933', "#FF5733", "#2AB3A6", "#C17A97", "#6EC4E8", "#A9D06E", "#F694C1", "#9F53C8", "#E1B135", "#4D9E66", "#EC7A44",];
        const charCode = initial.charCodeAt(0);
        const colorIndex = charCode % colors.length;

        // Return the selected color
        return colors[colorIndex];
    }

    const cancelRide = () => {
        API.put(`/profiles/riders/${data.riders.id}/`, {
            profile: data.profiles.id,
            driver: null
        }).then(res => {
            console.log(res.data)
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
                        data.driverUser.first_name ? 
                            (<Avatar aria-label="user" sx={{
                                backgroundColor: data.driverUser.first_name ? generateColorFromInitial(data.driverUser.first_name) : null
                            }}>
                                {data.driverUser.first_name.charAt(0)}{data.driverUser.last_name.charAt(0)}
                            </Avatar>) : <Avatar />
                    }
                    sx={{
                        color: '#454a4a',
                        "& .MuiCardHeader-subheader": {
                            color: 'black' // Adjust the color as needed
                        }
                    }}
                    title={data.driverUser.first_name + ' ' + data.driverUser.last_name}
                    subheader={
                        data.user.id === JSON.parse(localStorage.getItem('user')).user_id ?
                                        <Chip
                                            label="End Ride"
                                            onClick={cancelRide}
                                            icon={<CancelIcon />}
                                            color="error" variant={hover ? 'solid' : 'outlined'}
                                            onMouseEnter={() => {
                                                setHover(true)
                                            }}
                                            onMouseLeave={() => {
                                                setHover(false)
                                            }}
                                        /> : null
                
                    }
                />
                <CardMedia
                    component="img"
                    height="0"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary" style={{ color: '454a4a' }}>
                        Contact:{data.driverUser.email}<br />
                        School: {data.driverProfile.school} <br/>
                        Address: {data.driverProfile.address} <br/>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                </CardActions>
            </Card>
        </div>

    );
}