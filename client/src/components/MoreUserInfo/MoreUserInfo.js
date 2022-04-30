import React, { useState, useEffect } from 'react'
import './moreuserinfo.css';
import locationIcon from '../../img/location_icon.png';
import userPhoto from '../../img/user-icon.png'
import axios from 'axios';

let unmatchUrl = '/unmatch';
let userUrl = '/user';

function MoreProfileInfo({ signedIn, showMoreProfileInfo, setShowMoreProfileInfo, profile, setUser, nameLength, locationLength, handleLogOut }) {
    let [clickedLogOut, setClickedLogOut] = useState(false);
    let [clickedEdit, setClickedEdit] = useState(false);
    let [clickedReset,setClickedReset] = useState(false);

    function handleCloseProfile() {
        setShowMoreProfileInfo(!showMoreProfileInfo)
    }


    const [username, setUsername] = useState(signedIn ? profile.username : null)
    const [fullName, setFullName] = useState(signedIn ? profile.name : null)
    const [location, setLocation] = useState(signedIn ? profile.location : null)
    const [pronouns, setPronouns] = useState(signedIn ? profile.pronouns : null)
    const [description,setDescription] = useState(signedIn ? profile.description : null)

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

        if (description === '') {
            setPronouns(profile.description)
        }

        let updatedDetails = {
            "name": fullName,
            location,
            pronouns,
            username,
            description
        }

        axios.patch('/users/' + profile.id, updatedDetails)
            .then(r => {
                setUser(r.data)
                alert('Your account has been updated!')
                setClickedEdit(false)
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

    function handleConfirmReset(){

    }

    let LogOutbuttonsToDisplay = <React.Fragment>
        {clickedLogOut ? <button className='sb-matchinfo-close-button'>ARE YOU SURE?</button> : <button className='sb-matchinfo-close-button' onClick={handleCloseProfile}>CLOSE PROFILE</button>}
        {clickedLogOut ? <button className='sb-matchinfo-close-button' onClick={handleLogOut}>CONFIRM LOG OUT</button> : <button className='sb-matchinfo-close-button' onClick={() => { setClickedEdit(!clickedEdit) }}>EDIT PROFILE</button>}
        {clickedLogOut ? <button className='sb-matchinfo-close-button' onClick={() => { setClickedLogOut(false) }}>CANCEL</button> : <button className='sb-matchinfo-close-button' onClick={() => { setClickedLogOut(true) }}>LOG OUT</button>}
    </React.Fragment>

    let editButtonsToDisplay = clickedReset?<React.Fragment>
    <button className='sb-matchinfo-close-button'>ARE YOU SURE?</button>
    <button className='sb-matchinfo-close-button' onClick={handleConfirmReset}>CONFIRM RESET</button>
    <button className='sb-matchinfo-close-button' onClick={() => { setClickedReset(false) }}>CANCEL</button>
</React.Fragment>:<React.Fragment>
        <button className='sb-matchinfo-close-button' onClick={() => { setClickedReset(true) }}>RESET INTERACTIONS</button>
        <button className='sb-matchinfo-close-button' onClick={handleSubmitChanges}>CONFIRM EDITS</button>
        <button className='sb-matchinfo-close-button' onClick={() => { setClickedEdit(false) }}>CANCEL</button>
    </React.Fragment>

    

    let buttonsToDisplay = clickedEdit ? editButtonsToDisplay : LogOutbuttonsToDisplay

    let newText1 = profile.description.split(' ').slice(0, 8).map(word => word).join(' ')
    let newText2 = profile.description.split(' ').slice(8,).map(word => word).join(' ')

    return (
        <div className='moreuserinfo-cardContainer'>
            <div className='sb-matchinfo-card'>
                <img className='sb-matchinfo-img' src={userPhoto} />
                <div className='sb-matchinfo-box'>
                    {clickedEdit ? <input className='' type='text' name='name' value={fullName} placeholder='Full Name' onChange={(e) => { setFullName(e.target.value) }} /> : <h1 className={nameLength > 10 ? 'sb-card-title-long' : 'sb-matchinfo-card-title'}>{profile.name}</h1>}
                    <h3 className={locationLength > 15 ? 'sb-matchinfo-card-location-long' : 'sb-matchinfo-card-location'}><img className='moreuser-location-icon-here' src={locationIcon} />{clickedEdit ? <input className='' type='text' name='location' value={location} placeholder='Location' onChange={(e) => { setLocation(e.target.value) }} /> : profile.location}</h3>
                    <h3 className='sb-matchinfo-card-subtitle'>{clickedEdit ? <input className='' type='text' name='pronouns' value={pronouns} placeholder='Pronouns' onChange={(e) => { setPronouns(e.target.value) }} /> : profile.pronouns} - {profile.age} year dead</h3>
                    <hr></hr>
                    {clickedEdit ? <input className='' type='text' name='description' placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value) }}/> : <React.Fragment><div className='sb-matchinfo-card-text'>{newText1}</div>
                        <div className='sb-matchinfo-card-text'>{newText2}</div></React.Fragment>}
                    <div className='user-buttons'>
                    {buttonsToDisplay}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoreProfileInfo;