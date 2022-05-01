import React from 'react';
// import {TinderCard as Card} from './Card';
import TinderCard from 'react-tinder-card';
import info from '../../img/info-icon.png';
import './profilecard.css';


export default function ProfileCard({ childRefs, index, profile, swiped, outOfFrame, id, handleClickInfoButton }) {
  const charImages = require.context('../../img/characters', true);

  let profileDescription = profile.description.split('').length > 50 ? profile.description.slice(0, 50) + '...' : profile.description

  return (
    <TinderCard
      ref={childRefs[index]}
      className='swipe'
      key={profile.name}
      onSwipe={(dir) => swiped(dir, profile, index, id)}
      onCardLeftScreen={() => outOfFrame(profile.name, index)}
    >
      <div className='card'>
        <h3 className='name-age'>{profile.name}, <span>{profile.age}</span></h3>
        <img className='img' src={charImages('./' + profile.image)} />
        <div className='description-text'>{profileDescription}</div>
        <img className='info-icon' onClick={handleClickInfoButton} src={info} />
      </div>
    </TinderCard>
  )
}