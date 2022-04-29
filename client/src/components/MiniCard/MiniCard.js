import React from 'react'
import './minicard.css';

function MiniCard({ profile, showMoreProfileInfo, setShowMoreProfileInfo, setSelectedMatch, setShowMoreUserInfo }) {
    const charImages = require.context('../../img/characters', true);

    function handleOpenInfo() {
        setShowMoreProfileInfo(true)
        setSelectedMatch(profile)
        setShowMoreUserInfo(false)
    }

    return (
        <div className='mini-cardContainer'>
            <div className='mini-card'>
                <div className='mini-name'>{profile.name}</div>
                <img className='mini-img' src={charImages('./' + profile.image)} onClick={handleOpenInfo} />
            </div>
        </div>
    )
}

export default MiniCard;