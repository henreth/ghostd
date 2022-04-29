import React from 'react'
import './mediumcard.css';
import { Route, Link, useHistory } from "react-router-dom";




function MediumCard({ profile, showMoreProfileInfo, setShowMoreProfileInfo, setSelectedMatch }) {
    const charImages = require.context('../../img/characters', true);
    let history = useHistory();

    function handleOpenInfo() {
        setSelectedMatch(profile)
        setShowMoreProfileInfo(!showMoreProfileInfo)
    }

    return (
        <div className='med-cardContainer'>
            <div className='med-card'>
                <div className='med-name'>{profile.name}</div>
                <img className='med-img' onClick={handleOpenInfo} src={charImages('./' + profile.image)} />
            </div>
        </div>
    )
}

export default MediumCard;