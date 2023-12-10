import {React, useState, useEffect} from "react";
import { connect, useSelector, useDispatch} from "react-redux";
import { Link, useParams } from "react-router-dom";
import style from "./style.css";
import * as client from "./client";
import {findProfileByEmail} from "./client";
import {setProfile, updateProfile} from "./ProfileReducer";
import PropTypes from 'prop-types';
import { showAlert } from '../../utils/alertHelper';

function Profile ({ auth: { isAuthenticated, user }}) {
    let visitUserEmail = useParams().profileId;
    if (isAuthenticated && user && visitUserEmail === user.email) {
        visitUserEmail = null;
    }

    const privateProfile = visitUserEmail ? "invisible-profile" : "";
    const publicProfile = visitUserEmail ? "" : "invisible-profile";
    

    const dispatch = useDispatch();
    const profile = useSelector((state) => state.ProfileReducer.profile);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);
    const [registeredEvent, setRegisteredEvent] = useState([]);
    const [isfollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchProfile = async() => {
        try{
            let profileData = {};

            if (visitUserEmail) {
                // Fetch data for the visit user
                profileData = await findProfileByEmail(visitUserEmail);
            }
            else if (isAuthenticated && user) {
                // Fetch data for the current user
                profileData = await findProfileByEmail(user.email);
            }
            if (profileData) {
                dispatch(setProfile(profileData));
                if (profileData.following && user) {
                    setFollowingUsers(profileData.following);
                    setIsFollowing(profileData.followers.some((usr) => usr.email === user.email));
                }
                if (profileData.followers && user) {
                    setFollowedUsers(profileData.followers);
                }
                if  (profileData.registeredEvent && user) {
                    setRegisteredEvent(profileData.registeredEvent);
                }
            }
            else{
                showAlert('error', 'Error!', 'Profile not found');
            }
        }
        catch(error){
            showAlert('error', 'Error', 'An error occurred while fetching profile data');
        }
    };
    

    const handleUpdateProfile = async() => {
        await client.updateProfile(profile);
        dispatch(updateProfile(profile));
        showAlert('success', 'Success!', 'Profile Saved');
    };

    const handleFollow = async() => {
        if (isAuthenticated && user && visitUserEmail) {
            const profilePair = {
                followerEmail : user.email,
                followerName : user.name,
                followingEmail: profile.email,
                followingName: profile.name,
                }
            await client.follow(profilePair);
            dispatch(updateProfile(profile));
            setIsFollowing(true);
            showAlert('success', 'Success!', 'Followed');
        }
    };

    const handleUnFollow = async() => {
        if (isAuthenticated && user && visitUserEmail) {
            const profilePair = {
                followerEmail : user.email,
                followerName : user.name,
                followingEmail: profile.email,
                followingName: profile.name,
                }
            await client.unfollow(profilePair);
            dispatch(updateProfile(profile));
            setIsFollowing(false);
            showAlert('success', 'Success!', 'Unfollowed');
        }
    };
    useEffect( () => {
        fetchProfile();
      }, [isAuthenticated, isfollowing, visitUserEmail]
    );

    return (
        <div className = "content-container d-flex flex-wrap justify-content-center content-margin">
            
            <div className = "profile-container m-3">

                
                <div className = "row align-items-center m-0 ">
                    <div className = "col-9 text-start fs-1">
                        {profile.name}
                    </div>
                    <div className = "col-3 text-start fs-4">
                    <button className={`btn btn-primary border-width-2 float-end ${isfollowing ? "invisible-profile" : publicProfile}`} onClick = {handleFollow}>Follow</button>
                        <button className={`btn btn-outline-black border-width-2 float-end ${isfollowing ?  publicProfile: "invisible-profile"}`} onClick = {handleUnFollow}>UnFollow</button>

                        </div>
                </div>
                <div className = "row align-items-center m-0 ">
                    <div className = "col-4 text-start">
                        Email:
                    </div>
                    <div className = "col-8 text-start p-0 py-1">
                        <input type = "text" readOnly className="form-control-plaintext" value = {profile.email}/>
                    </div>
                </div>
                <div className = {"row align-items-center m-0 " + privateProfile}>
                    <div className = "col-4 text-start">
                        Phone:
                    </div>
                    <div className = "col-8 text-start p-0 py-1">
                        <input type = "text" className="form-control" value = {profile.phone} onChange={(e) => dispatch(setProfile({...profile, phone: e.target.value}))}/>
                    </div>
                </div>
                <div className = {"row align-items-center m-0 " + privateProfile}>
                    <div className = "col-4 text-start">
                        Address1:
                    </div>
                    <div className = "col-8 text-start p-0 py-1">
                        <input type = "text" className="form-control" value = {profile.address1} onChange={(e) => dispatch(setProfile({...profile, address1: e.target.value}))} />
                    </div>
                </div>
                <div className = {"row align-items-center m-0 " + privateProfile}>
                    <div className = "col-4 text-start">
                        Address2:
                    </div>
                    <div className = "col-8 text-start p-0 py-1">
                        <input type = "text" className="form-control" value = {profile.address2} onChange={(e) => dispatch(setProfile({...profile, address2: e.target.value}))}/>
                    </div>
                </div>
                <div className = {"row align-items-center m-0 px-0"}>
                    <div className = "col-12 text-end p-0">
                        <button className={"btn btn-danger border-width-2 float-end " + privateProfile}  onClick ={handleUpdateProfile}>Save</button>

                    </div>
                </div>
            </div>
            <div className = "profile-container m-3 ">
                <div className = "row align-items-center">
                    <div className = "text-secondary fs-4 col-6 ">
                        Followers:
                    </div>
                    <div className = "text-secondary fs-4 col-6 ">
                        Following:
                    </div>
                </div>
                <div className = "row">
                    <div className = "col-6">
                        <h2>{followedUsers.length}</h2>
                    </div>
                    <div className = "col-6">
                        <h2>{followingUsers.length}</h2>
                    </div>
                </div>
                <div className = "row">
                    <div className = "text-secondary fs-4 col-12 ">
                        Registered events:
                    </div>
                </div>
                <div className = "row">
                    <div className = "col-6">
                        <h2>{registeredEvent.length}</h2>
                    </div>
                </div>
                <div className = "row">
                    <div className = "text-secondary fs-4 col-12 ">
                        {followingUsers.length > 0 && (
                            <div >
                                {profile.name} is following:
                                <ul className = "ul-profile">
                                    {followingUsers.map((user, index) => (
                                        <li >
                                            <Link className = "userId" to={`/EventHive/profile/${user.email}`}>{user.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                                
                            </div>
                        )}
                    </div>
                </div>
                <div className = "row">
                    <div className = "text-secondary fs-4 col-12 ">
                        {followedUsers.length > 0 && (
                            <div>
                                {profile.name} is followed by:
                                
                                <ul className = "ul-profile">
                                    {followedUsers.map((user, index) => (
                                        <li>
                                            <Link className = "userId" to={`/EventHive/profile/${user.email}`}>{user.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                                
                                
                            </div>
                        )}
                    </div>
                </div>
                <div className = "row">
                    <div className = "text-secondary fs-4 col-12 ">
                        {registeredEvent.length > 0 && (
                            <div className = "my-2">
                                {profile.name} is registered for:
                                <ul className = "ul-profile">
                                    {registeredEvent.map((event, index) => (
                                        <li>
                                            <Link className = "eventId" to={`/EventHive/Events/${event.eventId}`}>{event.eventTitle}</Link>
                                        </li>
                                    ))}
                                </ul>
                                
                            </div>
                        )}
                    </div>
                </div>
                
            </div>
            
        </div>
        
        
    );
}

Profile.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps)(Profile);