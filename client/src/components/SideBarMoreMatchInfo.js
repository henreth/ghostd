import React, { useState,useEffect } from 'react'
import '../style/sidebarmorematchinfo.css';
import location from '../img/location_icon.png';
import axios from 'axios';

let unmatchUrl = 'http://localhost:4000/unmatch';
let userUrl = 'http://localhost:4000/user';

function SideBarMoreMatchInfo ({profile,nameLength,setShowMoreProfileInfo,descriptionLength,locationLength,matches,setMatches}) {

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

    let matchinfocardtext = descriptionLength >40?'matchinfo-card-text-long':'matchinfo-card-text'

    return (
        <div className='matchinfo-cardContainer'>
            <div className='matchinfo-card'>
            <img className='matchinfo-img' src={profile.image}/>
                <div className='info-box'>
                    <h1 className={nameLength > 10?'matchinfo-card-title-long':'matchinfo-card-title'}>{profile.name}</h1>
                    <h3 className={locationLength > 15? 'matchinfo-card-location-long':'matchinfo-card-location'}><img className ='location-icon-here' src={location}/>{profile.location}</h3>
                    <h3 className='matchinfo-card-subtitle'>{profile.pronouns} - {profile.age} years dead</h3>
                    <hr></hr>
                    <p className={matchinfocardtext}>{profile.description}</p>
                    {clicked? <button className='matchinfo-clicked-button'>UNMATCHED</button>:<button className='matchinfo-unmatch-button' onClick={handleRemoveClick}>UNMATCH</button>}
                    <button className='matchinfo-close-button' onClick={handleCloseProfile}>CLOSE PROFILE</button>
                </div>
            </div>
      </div>
    )
}

export default SideBarMoreMatchInfo;