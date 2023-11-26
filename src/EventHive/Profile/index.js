import {React, useState, useEffect} from "react";
import NavBar from "../../components/NavBar/NavBar";
import style from "./style.css";
import axios from "axios";
import * as client from "./client";
import { findProfileByEmail, updateProfile } from "./client";
import { useSelector, useDispatch } from "react-redux";
import { setProfile} from "./ProfileReducer";
// import db from "../../Database";

// todo
// 1.get information from database
// 2.implement edit function
function Profile () {
    const testEmail = "abc.com";
    const dispatch = useDispatch();
    console.log("Profile");

    // todo
    // Get email information from login page/ state

    // const profile = useSelector((state) => state.ProfileReducer.Profile);
    const testProfile = findProfileByEmail(testEmail);
    console.log('testProfile')
    console.log(testProfile);
    // useEffect(() => {
    //     findProfileByEmail(testEmail)
    //       .then((profile) => {
    //         // Update the profile in the Redux store
    //         dispatch(setProfile(profile));
    //       })
    //       .catch((error) => {
    //         console.error("Error fetching profile:", error);
    //       });
    //   }, []);
    const handleUpdateProfile = async() => {
        const status = await client.updateProfile(profile);
        dispatch(updateProfile(profile));
    };


    const profile = {
        name: "testName",
        email: "testEmail",
        phone: "testPhone",
        address1: "testAddress1",
        address2: "testAddress2",
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
                {/* display private info */}
                {/* need to hide when not logged in */}
                {/* {privateInfo.map((link, index) => (
                    <div className = "row">
                        <div className = "col-4 text-start">
                            {link.text}
                        </div>
                        <div className = "col-8 text-start p-1">
                            <input type = "text" className="form-control" value = {link.value}/>
                        </div>
                    </div>
                ))} */}
                <button className="btn btn-danger border-width-2 float-end" onclick ={handleUpdateProfile}>Save</button>
            </div>
            
        </div>
        
        
    );
}

// export default NavBar;

Profile.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps)(Profile);