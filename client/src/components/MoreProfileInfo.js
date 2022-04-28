import React, { useState, useEffect } from 'react'
import '../style/moreprofileinfo.css';
import location from '../img/location_icon.png';
import userPhoto from '../img/user-icon.png'
import axios from 'axios';

let unmatchUrl = 'http://localhost:4000/unmatch';
let userUrl = 'http://localhost:4000/user';

function MoreProfileInfo({ signedIn, showMoreProfileInfo, setShowMoreProfileInfo, profile, setUser, nameLength, locationLength, handleLogOut }) {
    let [clickedLogOut, setClickedLogOut] = useState(false);
    let [clickedEdit, setClickedEdit] = useState(false);

    function handleCloseProfile() {
        setShowMoreProfileInfo(!showMoreProfileInfo)
    }


    const [username, setUsername] = useState(signedIn ? profile.username : null)
    const [fullName, setFullName] = useState(signedIn ? profile.name : null)
    const [location, setLocation] = useState(signedIn ? profile.location : null)
    const [pronouns, setPronouns] = useState(signedIn ? profile.pronouns : null)

    function handleSubmitChanges(e) {
        e.preventDefault();
        if (username === '') {
            setUsername(profile.username)
        }

        if (fullName === '') {
            setFullName(profile.name)
        }

        if (location === '') {
            setLocation(profile.location)
        }
        
        if (pronouns === '') {
            setPronouns(profile.pronouns)
        }

        let updatedDetails = {
            "name": fullName,
            location,
            pronouns,
            username
        }

        axios.patch('/users/' + profile.id, updatedDetails)
            .then(r => {
                setUser(r.data)
                alert('Your account has been updated!')
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data.errors);
                    alert(error.response.data.errors)
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });
    }

    let LogOutbuttonsToDisplay = <React.Fragment>
        {clickedLogOut ? <button className='close-button'>ARE YOU SURE?</button> : <button className='close-button' onClick={handleCloseProfile}>CLOSE PROFILE</button>}
        {clickedLogOut ? <button className='close-button' onClick={handleLogOut}>CONFIRM LOG OUT</button> : <button className='close-button' onClick={() => { setClickedEdit(!clickedEdit) }}>EDIT PROFILE</button>}
        {clickedLogOut ? <button className='close-button' onClick={() => { setClickedLogOut(false) }}>CANCEL</button> : <button className='close-button' onClick={() => { setClickedLogOut(true) }}>LOG OUT</button>}
    </React.Fragment>

    let editButtonsToDisplay = <React.Fragment>
        <button className='close-button' onClick={handleSubmitChanges}>CONFIRM</button> 
        <button className='close-button' onClick={() => { setClickedEdit(false) }}>CANCEL</button> 
        </React.Fragment>

    let buttonsToDisplay = clickedEdit?editButtonsToDisplay:LogOutbuttonsToDisplay


    return (
        <div className='moreProfileInfo-cardContainer'>
            <div className={profile.name === 'Jonathan' ? 'moreuser-info-card' : 'moreprofile-info-card'}>
                <img className='moreprofile-info-img' src={profile.image} />
                <div className='info-box'>
                    <h1 className={nameLength > 10 ? 'card-title-long' : 'card-title'}>{profile.name}</h1>
                    <h3 className={locationLength > 15 ? 'card-location-long' : 'card-location'}><img className='location-icon-here' src={location} />{profile.location}</h3>
                    <h3 className='card-subtitle'>{profile.pronouns} - {profile.age} years dead</h3>
                    <hr></hr>
                    <p className='card-text'>{profile.description}</p>
                    {buttonsToDisplay}
                </div>
            </div>
        </div>
    )
}

export default MoreProfileInfo;