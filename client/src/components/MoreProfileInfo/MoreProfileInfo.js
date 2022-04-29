import React, { useState,useEffect } from 'react'
import './moreprofileinfo.css';
import location from '../../img/location_icon.png';
import userPhoto from '../../img/user-icon.png'
import axios from 'axios';

let unmatchUrl = '/unmatch';
let userUrl = '/user';

function MoreProfileInfo ({showMoreProfileInfo, setShowMoreProfileInfo, profile,nameLength,locationLength}) {
    const charImages = require.context('../../img/characters', true);

    function handleCloseProfile(){
        setShowMoreProfileInfo(!showMoreProfileInfo)
    }

    return (
            <div className='moreprofile-info-card'>
            <img className='moreprofile-info-img' src={charImages('./' + profile.image)}/>
                <div className='moreprofile-info-box'>
                    <h1 className={nameLength > 10?'moreprofile-card-title-long':'moreprofile-card-title'}>{profile.name}</h1>
                    <h3 className={locationLength > 15? 'moreprofile-card-location-long':'moreprofile-card-location'}><img className ='moreprofile-location-icon-here' src={location}/>{profile.location}</h3>
                    <h3 className='moreprofile-card-subtitle'>{profile.pronouns} - {profile.age} years dead</h3>
                    <hr></hr>
                    <p className='moreprofile-card-text'>{profile.description}</p>
                    <button className='moreprofile-close-button' onClick={handleCloseProfile}>CLOSE PROFILE</button>
                </div>
            </div>
    )
}

export default MoreProfileInfo;