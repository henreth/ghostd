import React from 'react'
import '../style/mediumcard.css';
import { Route, Link, useHistory } from "react-router-dom";




function MediumCard ({profile,showMoreProfileInfo,setShowMoreProfileInfo,setSelectedMatch}) {
    let history = useHistory();

    // function handleInfoClick(){
    //     history.push(`/match/${character.id}`)
    // }

    function handleOpenInfo(){
        setSelectedMatch(profile)
        setShowMoreProfileInfo(!showMoreProfileInfo)
    }

    return (
        <div className='med-cardContainer'>
                <div
                    className='med-card'
                >
                    <div className='med-name'>{profile.name}</div>
                    <img className='med-img' onClick={handleOpenInfo} src={profile.image}/>

                </div>
      </div>
    )
}

export default MediumCard;