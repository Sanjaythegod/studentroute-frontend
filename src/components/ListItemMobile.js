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

export default function ListItemMobile({ data }) {
    const [expanded, setExpanded] = React.useState(false);
    const [moreinfo, showMoreInfo] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const showFullDescription = (description) => {
        showMoreInfo(true);
    };
    function generateColorFromInitial(initial) {
        // Define an array of possible colors
        const colors = ['#ff5733', '#33ff57', '#5733ff', '#ff33d1', '#33a5ff', '#ffc933'];

        // Use the ASCII value of the initial character to pick a color from the array
        const charCode = initial.charCodeAt(0);
        const colorIndex = charCode % colors.length;

        // Return the selected color
        return colors[colorIndex];
    }

    const generateRandomColor = (firstName) => {
        const firstLetter = firstName.charAt(0).toLowerCase();
        const letterCode = firstLetter.charCodeAt(0) - 97; // ASCII code for 'a' is 97

        const r = (letterCode * 7) % 256;
        const g = (letterCode * 13) % 256;
        const b = (letterCode * 19) % 256;

        return `rgb(${r}, ${g}, ${b})`;
    };

    



    return (
        <div style={{
            display: "flex",
            margin: "10px",
            justifyContent: "center"
        }}>
            <Card sx={{ width: '90%', backgroundColor: 'white'}} >
                <CardHeader
                    avatar={
                        <Avatar aria-label="user" sx={{
                            backgroundColor: generateColorFromInitial(data.first_name[0])
                        }}>
                            {data.first_name.charAt(0)}{data.last_name.charAt(0)}
                        </Avatar>
                    }
                    sx={{
                        color: '#454a4a',
                        "& .MuiCardHeader-subheader": {
                            color: 'black' // Adjust the color as needed
                        }
                    }}
                    title={data.first_name + ' ' + data.last_name}
                    subheader={data.email}
                />
                <CardMedia
                    component="img"
                    height="0"

                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary" style={{ color: '454a4a' }}>
                        Time: {data.time_date}<br />
                        Frequency: {data.frequency_pick_up} <br />
                        Home Address: {data.home_address}

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
                        <Typography style={{ color: '454a4a' }}>{data.extra_info}</Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>

    );
}