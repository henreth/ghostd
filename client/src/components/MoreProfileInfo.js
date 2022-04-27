import React, { useState,useEffect } from 'react'
import '../style/moreprofileinfo.css';
import location from '../img/location_icon.png';
import userPhoto from '../img/user-icon.png'
import axios from 'axios';

let unmatchUrl = 'http://localhost:4000/unmatch';
let userUrl = 'http://localhost:4000/user';

function MoreProfileInfo ({showMoreProfileInfo, setShowMoreProfileInfo, profile,nameLength,locationLength}) {
    // console.log(nameLength)


    function handleCloseProfile(){
        setShowMoreProfileInfo(!showMoreProfileInfo)
    }

    return (
        <div className='moreProfileInfo-cardContainer'>
            <div className={profile.name==='Jonathan'?'moreuser-info-card':'moreprofile-info-card'}>
            {profile.name==='Jonathan'?<img className='moreuser-info-img' src={userPhoto}/>:<img className='moreprofile-info-img' src={profile.image}/>}
                <div className='info-box'>
                    <h1 className={nameLength > 10?'card-title-long':'card-title'}>{profile.name}</h1>
                    <h3 className={locationLength > 15? 'card-location-long':'card-location'}><img className ='location-icon-here' src={location}/>{profile.location}</h3>
                    <h3 className='card-subtitle'>{profile.pronouns} - {profile.age} years dead</h3>
                    <hr></hr>
                    <p className='card-text'>{profile.description}</p>
                    <button className='close-button' onClick={handleCloseProfile}>CLOSE PROFILE</button>
                </div>
            </div>
      </div>
    )
}

export default MoreProfileInfo;