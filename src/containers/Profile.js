import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import ProfileComponent from "../components/ProfileComponent";
import NavBar from "../components/NavBar";
import DriverProfileComponent from "../components/DriverProfileComponent";
import API from "../apiconfig";



export default function Profile() {
    const {id} = useParams();
    const auth = localStorage.getItem('auth')
    const [user, setUser] = useState('');
    const [profile, setProfile] = useState('');
    const [rider, setRider] = useState('');
    const [post, setPost] = useState();
    const [driver, setDriver] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get(`/users/${id}/`).then((res) => {
            setUser(res.data);
            const userId = res.data.id;
            API.get(`/profiles`).then((profileres) => {
                setProfile(profileres.data.filter((profile) => profile.user === userId)[0]);
                const profileID = profileres.data.filter((profile) => profile.user === userId)[0].id;
                API.get(`/profiles/riders/`).then((res2) => {
                    setRider(res2.data.filter((driver) => driver.profile === profileID));
                }).then(() => {
                    setLoading(false)
                })
            });
        });
    }, []);

    return(
        <div style={{width: '100%',height: '100%'}}>
            <NavBar auth={auth} firstName={JSON.parse(localStorage.getItem('user')).user_first_name} lastName={JSON.parse(localStorage.getItem('user')).user_last_name}/>

            {!loading ? (!rider.length > 0 ? <DriverProfileComponent id={id}/> : <ProfileComponent id={id}/>) : <div style={{marginTop: '75px'}}>loading ...</div> }
            
        </div>
    )
}