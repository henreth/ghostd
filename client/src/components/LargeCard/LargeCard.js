import React, { useState,useEffect } from 'react'
import './largecard.css';
import location from '../../img/location_icon.png';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

let unmatchUrl = '/unmatch';

export default function LargeCard ({profile,nameLength,locationLength,matches,setMatches,user}) {
    const charImages = require.context('../../img/characters', true);

    let [clicked,setClicked] = useState(false);
    let history = useHistory()

    function handleRemoveClick(){
        setClicked(true);
        axios.patch(unmatchUrl,{
            user_id: user.id,
            profile_id: profile.id
        })
        setMatches(matches.filter(match=>{
            return match.id !== profile.id
          }))
        history.push('/')
    
    }

    let imgToDisplay = () => { 
        try {
            return <img className='large-img' src={charImages('./' + profile.image)}/>
        } catch (error){
            return  null
        }
        }


    return (
        <div className='large-cardContainer'>
            <div className='large-card'>
            {imgToDisplay()}
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

