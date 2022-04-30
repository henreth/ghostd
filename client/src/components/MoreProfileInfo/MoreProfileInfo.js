import React, { useState,useEffect } from 'react'
import './moreprofileinfo.css';
import location from '../../img/location_icon.png';
import userPhoto from '../../img/user-photo.png'
import axios from 'axios';

let unmatchUrl = '/unmatch';
let userUrl = '/user';

function MoreProfileInfo ({showMoreProfileInfo, setShowMoreProfileInfo, profile,nameLength,locationLength}) {
    const charImages = require.context('../../img/characters', true);

    function handleCloseProfile(){
        setShowMoreProfileInfo(!showMoreProfileInfo)
    }

    let newText1 = profile.description.split(' ').slice(0,8).map(word=>word).join(' ')
    let newText2 = profile.description.split(' ').slice(8,).map(word=>word).join(' ')

    return (
            <div className='moreprofile-info-card'>
            <img className='moreprofile-info-img' src={charImages('./' + profile.image)}/>
                <div className='moreprofile-info-box'>
                    <h1 className={nameLength > 10?'moreprofile-card-title-long':'moreprofile-card-title'}>{profile.name}</h1>
                    <h3 className={locationLength > 15? 'moreprofile-card-location-long':'moreprofile-card-location'}><img className ='moreprofile-location-icon-here' src={location}/>{profile.location}</h3>
                    <h3 className='moreprofile-card-subtitle'>{profile.pronouns}</h3>
                    <h3 className='moreprofile-card-subtitle'>{profile.age} years dead</h3>
                    <hr></hr>
                    <div className='moreprofile-card-text'>{newText1}</div>
                    <div className='moreprofile-card-text'>{newText2}</div>
                    <button className='moreprofile-close-button' onClick={handleCloseProfile}>CLOSE PROFILE</button>
                </div>
            </div>
    )
}

export default MoreProfileInfo;