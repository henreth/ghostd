import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import './moreuserinfo.css';
import locationIcon from '../../img/location_icon.png';
import userPhoto from '../../img/user-photo.png'
import axios from 'axios';

let unmatchUrl = '/unmatch';
let userUrl = '/user';

function MoreProfileInfo({ signedIn, showMoreProfileInfo, setShowMoreProfileInfo, profile, setUser, nameLength, locationLength, handleLogOut, setLikeCount, setMatches, setProfiles, setCurrentIndex, setLastPerson }) {
    let [clickedLogOut, setClickedLogOut] = useState(false);
    let [clickedEdit, setClickedEdit] = useState(false);
    let [clickedReset, setClickedReset] = useState(false);
    let history = useHistory();

    function handleCloseProfile() {
        setShowMoreProfileInfo(!showMoreProfileInfo)
    }


    const [username, setUsername] = useState(signedIn ? profile.username : null)
    const [fullName, setFullName] = useState(signedIn ? profile.name : null)
    const [location, setLocation] = useState(signedIn ? profile.location : null)
    const [pronouns, setPronouns] = useState(signedIn ? profile.pronouns : null)
    const [description, setDescription] = useState(signedIn ? profile.description : null)

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
            setDescription(profile.description)
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

    function handleConfirmReset() {
        axios.post('/reset')
            .then(r => {
                alert('All interactions have been reset!')
                axios.get('/unswiped_profiles')
                    .then(r => {
                        setProfiles(r.data)
                        setCurrentIndex(r.data.length - 1)
                        setLastPerson(r.data[r.data.length - 1])

                        axios.get('/matches')
                            .then(r => {
                                setMatches(r.data)
                            })

                        axios.get('/unswiped_likes')
                            .then(r => setLikeCount(r.data))
                        history.push('/')
                        window.location.reload();
                    })
            })
    }

    let LogOutbuttonsToDisplay = <React.Fragment>
        {clickedLogOut ? <button className='user-info-button'>ARE YOU SURE?</button> : <button className='user-info-button' onClick={handleCloseProfile}>CLOSE PROFILE</button>}
        {clickedLogOut ? <button className='user-info-button' onClick={handleLogOut}>CONFIRM LOG OUT</button> : <button className='user-info-button' onClick={() => { setClickedEdit(!clickedEdit) }}>EDIT PROFILE</button>}
        {clickedLogOut ? <button className='user-info-button' onClick={() => { setClickedLogOut(false) }}>CANCEL</button> : <button className='user-info-button' onClick={() => { setClickedLogOut(true) }}>LOG OUT</button>}
    </React.Fragment>

    let editButtonsToDisplay = clickedReset ? <React.Fragment>
        <button className='user-info-button'>ARE YOU SURE?</button>
        <button className='user-info-button' onClick={handleConfirmReset}>CONFIRM RESET</button>
        <button className='user-info-button' onClick={() => { setClickedReset(false) }}>CANCEL</button>
    </React.Fragment> : <React.Fragment>
        <button className='user-info-button' onClick={() => { setClickedReset(true) }}>RESET INTERACTIONS</button>
        <button className='user-info-button' onClick={handleSubmitChanges}>CONFIRM EDITS</button>
        <button className='user-info-button' onClick={() => { setClickedEdit(false) }}>CANCEL</button>
    </React.Fragment>



    let buttonsToDisplay = clickedEdit ? editButtonsToDisplay : LogOutbuttonsToDisplay

    let newText1 = profile.description.split(' ').slice(0, 7).map(word => word).join(' ')
    let newText2 = profile.description.split(' ').slice(7,).map(word => word).join(' ')

    return (
        <div className='sb-matchinfo-cardContainer'>
            <div className='sb-matchinfo-card usercard'>
                <img className='moreuser-info-img' src={userPhoto} />

                <div className='sb-info-box'>
                    {clickedEdit ? <input className='user-info-input' type='text' name='username' value={username} placeholder='Username' onChange={(e) => { setUsername(e.target.value) }} /> : null}
                    {clickedEdit ? <input className='user-info-input' type='text' name='name' value={fullName} placeholder='First Name' onChange={(e) => { setFullName(e.target.value) }} /> : <h1 className={nameLength > 10 ? 'sb-matchinfo-card-title-long' : 'sb-matchinfo-card-title'}>{profile.name}</h1>}
                    {clickedEdit ? <input className='user-info-input' type='text' name='location' value={location} placeholder='Location' onChange={(e) => { setLocation(e.target.value) }} /> :<h3 className={locationLength > 15 ? 'sb-matchinfo-card-location-long' : 'sb-matchinfo-card-location'}><img className='moreuser-location-icon-here' src={locationIcon} />{profile.location}</h3>}
                    {clickedEdit ? <input className='user-info-input' type='text' name='pronouns' value={pronouns} placeholder='Pronouns' onChange={(e) => { setPronouns(e.target.value) }} /> :<h3 className='sb-matchinfo-card-subtitle'>{profile.pronouns} - {profile.age} year dead</h3>}
                    <hr></hr>
                    {clickedEdit ? <input className='user-info-input description' type='text' name='description' placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value) }} /> : <React.Fragment><div className='sb-matchinfo-card-text'>{newText1}</div>
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