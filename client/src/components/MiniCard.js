import React from 'react'
import '../style/minicard.css';

function MiniCard ({profile,showMoreProfileInfo,setShowMoreProfileInfo,setSelectedMatch,setShowMoreUserInfo}) {

    function handleOpenInfo(){
        setShowMoreProfileInfo(true)
        setSelectedMatch(profile)
        setShowMoreUserInfo(false)
    }

    return (
        <div className='mini-cardContainer'>
                <div
                    className='mini-card'
                >
                    <div className='mini-name'>{profile.name}</div>
                    <img className='mini-img' src={profile.image} onClick={handleOpenInfo}/>
                </div>
      </div>
    )
}

export default MiniCard;