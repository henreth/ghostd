import React, { useState,useEffect } from 'react'
import './sidebarmorematchinfo.css';
import location from '../../img/location_icon.png';
import axios from 'axios';

let unmatchUrl = 'http://localhost:4000/unmatch';
let userUrl = 'http://localhost:4000/user';

function SideBarMoreMatchInfo ({profile,nameLength,setShowMoreProfileInfo,descriptionLength,locationLength,matches,setMatches}) {
    const charImages = require.context('../../img/characters', true);

    let [userx,setUserx] = useState('')
    useEffect(()=>{
      axios.get(userUrl)
      .then(r=>setUserx(r.data))
    },[])
    let id = userx.id

    let [clicked,setClicked] = useState(false);

    function handleRemoveClick(){
        setClicked(true);
        axios.patch(unmatchUrl,{
            user_id: id,
            profile_id: profile.id
        })
        setMatches(matches.filter(match=>{
            return match.id !== profile.id
          }))
    
    }

    function handleCloseProfile(){
        setShowMoreProfileInfo(false)
    }

    let newText1 = profile.description.split(' ').slice(0,7).map(word=>word).join(' ')
    let newText2 = profile.description.split(' ').slice(7,).map(word=>word).join(' ')

    return (
        <div className='sb-matchinfo-cardContainer'>
            <div className='sb-matchinfo-card'>
            <img className='sb-matchinfo-img' src={charImages('./' + profile.image)}/>
                <div className='sb-info-box'>
                    <h1 className={nameLength > 10?'sb-matchinfo-card-title-long':'sb-matchinfo-card-title'}>{profile.name}</h1>
                    <h3 className={locationLength > 15? 'sb-matchinfo-card-location-long':'sb-matchinfo-card-location'}><img className ='location-icon-here' src={location}/>{profile.location}</h3>
                    <h3 className='sb-matchinfo-card-subtitle'>{profile.pronouns} - {profile.age} years dead</h3>
                    <hr></hr>
                    <div className='sb-matchinfo-card-text'>{newText1}</div>
                    <div className='sb-matchinfo-card-text'>{newText2}</div>
                    {clicked? <button className='sb-matchinfo-clicked-button'>UNMATCHED</button>:<button className='sb-matchinfo-unmatch-button' onClick={handleRemoveClick}>UNMATCH</button>}
                    <button className='sb-matchinfo-close-button' onClick={handleCloseProfile}>CLOSE PROFILE</button>
                </div>
            </div>
      </div>
    )
}

export default SideBarMoreMatchInfo;