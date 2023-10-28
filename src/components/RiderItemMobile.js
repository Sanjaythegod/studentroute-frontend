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

export default function RiderItemMobile({ data }) {
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








    return (
        <div style={{
            display: "flex",
            margin: "10px",
            justifyContent: "center"
        }}>
            <Card sx={{ width: '90%', backgroundColor: 'white' }} >

                <CardHeader
                    avatar={
                        data.user.first_name ?
                            (<Avatar aria-label="user" sx={{
                                backgroundColor: data.user.first_name ? generateColorFromInitial(data.user.first_name) : null
                            }}>
                                {data.user.first_name.charAt(0)}{data.user.last_name.charAt(0)}
                            </Avatar>) : <Avatar />
                    }
                    sx={{
                        color: '#454a4a',
                        "& .MuiCardHeader-subheader": {
                            color: 'black' // Adjust the color as needed
                        }
                    }}
                    title={data.user.first_name + ' ' + data.user.last_name}
                />
                <CardMedia
                    component="img"
                    height="0"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary" style={{ color: '454a4a' }}>
                        Contact: <a href={`mailto:${data.user.email}`}>{data.user.email}</a><br />
                        School: {data.profile.school} <br />
                        Address: {data.profile.address} <br />
                    </Typography>

                </CardContent>
                <CardActions disableSpacing>
                    <Typography style={{ color: '454a4a' }}>View additional info:</Typography>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon style={{ color: '454a5a' }} />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography style={{ color: '454a4a' }}>Pick up time: {data.post.time}</Typography>
                        <Typography style={{ color: '454a4a' }}>Pick up frequency: {data.post.frequency}</Typography>
                        <Typography style={{ color: '454a4a' }}>Additional Info{data.post.additional_info}</Typography>

                    </CardContent>
                </Collapse>
            </Card>
        </div>

    );
}