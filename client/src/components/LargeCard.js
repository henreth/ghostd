import React, { useState,useEffect } from 'react'
import '../style/largecard.css';
import location from '../img/location_icon.png';
import axios from 'axios';

let unmatchUrl = 'http://localhost:4000/unmatch';
let userUrl = 'http://localhost:4000/user';

function LargeCard ({profile,nameLength,locationLength,matches,setMatches}) {

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

    return (
        <div className='large-cardContainer'>
            <div className='large-card'>
            <img className='large-img' src={profile.image}/>
                <div className='info-box'>
                    <h1 className={nameLength > 10?'card-title-long':'card-title'}>{profile.name}</h1>
                    <h3 className={locationLength > 15? 'card-location-long':'card-location'}><img className ='location-icon-here' src={location}/>{profile.location}</h3>
                    <h3 className='card-subtitle'>{profile.pronouns} - {profile.age} years dead</h3>
                    <hr></hr>
                    <p className='card-text'>{profile.description}</p>
                    {clicked? <button className='clicked-button'>UNMATCHED</button>:<button className='unmatch-button' onClick={handleRemoveClick}>UNMATCH</button>}
                </div>
            </div>
      </div>
    )
}

export default LargeCard;