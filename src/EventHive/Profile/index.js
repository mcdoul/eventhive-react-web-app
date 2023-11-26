import {React, useState, useEffect} from "react";
import style from "./style.css";
import * as client from "./client";
import {findProfileByEmail} from "./client";
import { connect, useSelector, useDispatch} from "react-redux";
import { Navigate } from 'react-router-dom';
import {setProfile, updateProfile} from "./ProfileReducer";
import PropTypes from 'prop-types';
import { showAlert } from '../../utils/alertHelper';

function Profile ({ auth: { isAuthenticated, user }}) {
    const testEmail = user.email;
    // const testEmail = "abcde.com";
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.ProfileReducer.profile);

    useEffect(() => {
        // Fetch data from the backend
        findProfileByEmail(testEmail).then((profile) => {
            dispatch(setProfile(profile))
        });
    }, [testEmail]);

    const handleUpdateProfile = async() => {
        const status = await client.updateProfile(profile);
        dispatch(updateProfile(profile));
        showAlert('success', 'Success!', 'Profile Saved');
    };

    return (
        <div className = "d-flex">
            
            <div className = "profile-container ">
            
                {/* <button className="btn btn-outline-white border-width-2 float-end">Edit</button> */}
                <h1>{profile.name}</h1>
                
                <div className = "row align-items-center">
                    <div className = "col-4 text-start">
                        Email:
                    </div>
                    <div className = "col-8 text-start p-1">
                        <input type = "text" readonly className="form-control-plaintext" value = {profile.email}/>
                    </div>
                </div>
                <div className = "row align-items-center">
                    <div className = "col-4 text-start">
                        Phone:
                    </div>
                    <div className = "col-8 text-start p-1">
                        <input type = "text" className="form-control" value = {profile.phone} onChange={(e) => dispatch(setProfile({...profile, phone: e.target.value}))}/>
                    </div>
                </div>
                <div className = "row align-items-center">
                    <div className = "col-4 text-start">
                        Address1:
                    </div>
                    <div className = "col-8 text-start p-1">
                        <input type = "text" className="form-control" value = {profile.address1} onChange={(e) => dispatch(setProfile({...profile, address1: e.target.value}))} />
                    </div>
                </div>
                <div className = "row align-items-center">
                    <div className = "col-4 text-start">
                        Address2:
                    </div>
                    <div className = "col-8 text-start p-1">
                        <input type = "text" className="form-control" value = {profile.address2} onChange={(e) => dispatch(setProfile({...profile, address2: e.target.value}))}/>
                    </div>
                </div>
                <button className="btn btn-danger border-width-2 float-end" onClick ={handleUpdateProfile}>Save</button>
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