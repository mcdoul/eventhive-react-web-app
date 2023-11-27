import {React, useState, useEffect} from "react";
import { connect, useSelector, useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import style from "./style.css";
import * as client from "./client";
import {findProfileByEmail} from "./client";
import {setProfile, updateProfile} from "./ProfileReducer";
import PropTypes from 'prop-types';
import { showAlert } from '../../utils/alertHelper';

function Profile ({ auth: { isAuthenticated, user }}) {
    let visitUserEmail = useParams().profileId;
    const publicProfile = visitUserEmail ? "invisable-profile" : "";
    const privateProfile = visitUserEmail ? "" : "invisable-profile";
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.ProfileReducer.profile);

    useEffect( () => {
        fetchProfile();
      }, [isAuthenticated, visitUserEmail]
    );
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
        const status = await client.updateProfile(profile);
        dispatch(updateProfile(profile));
        showAlert('success', 'Success!', 'Profile Saved');
    };

    const handleFollow = async() => {
        if (isAuthenticated && user) {
            console.log(user.email + " is following " + visitUserEmail);
        }
    }

    const handleUnFollow = async() => {
        if (isAuthenticated && user) {
            console.log(user.email + " unfollows " + visitUserEmail);
        }
    }

    return (
        <div className = "d-flex">
            
            <div className = "profile-container ">
            
                {/* <button className="btn btn-outline-white border-width-2 float-end">Edit</button> */}
                <h1>{profile.name}</h1>
                {/* <h3>Current user : {user.name}</h3> */}
                {/* <h3>Visit user = {visitUserEmail}</h3>
                <h3>Public profile: {isPublicProfile ? 'true' : 'false'}</h3> */}
                

                <div className = "row align-items-center">
                    <div className = "col-4 text-start">
                        Email:
                    </div>
                    <div className = "col-8 text-start p-1">
                        <input type = "text" readonly className="form-control-plaintext" value = {profile.email}/>
                    </div>
                </div>
                <div className = {"row align-items-center " + publicProfile}>
                    <div className = "col-4 text-start">
                        Phone:
                    </div>
                    <div className = "col-8 text-start p-1">
                        <input type = "text" className="form-control" value = {profile.phone} onChange={(e) => dispatch(setProfile({...profile, phone: e.target.value}))}/>
                    </div>
                </div>
                <div className = {"row align-items-center " + publicProfile}>
                    <div className = "col-4 text-start">
                        Address1:
                    </div>
                    <div className = "col-8 text-start p-1">
                        <input type = "text" className="form-control" value = {profile.address1} onChange={(e) => dispatch(setProfile({...profile, address1: e.target.value}))} />
                    </div>
                </div>
                <div className = {"row align-items-center " + publicProfile}>
                    <div className = "col-4 text-start">
                        Address2:
                    </div>
                    <div className = "col-8 text-start p-1">
                        <input type = "text" className="form-control" value = {profile.address2} onChange={(e) => dispatch(setProfile({...profile, address2: e.target.value}))}/>
                    </div>
                </div>
                <button className={"btn btn-danger border-width-2 float-end " + publicProfile}  onClick ={handleUpdateProfile}>Save</button>
                <button className={"btn btn-success border-width-2 float-end " + privateProfile} onClick = {handleFollow}>Follow</button>
                <button className={"btn btn-warning border-width-2 float-end " + privateProfile} onClick = {handleUnFollow}>UnFollow</button>
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