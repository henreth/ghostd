import React from 'react';
import Card from './Card';
import info from '../img/info-icon.png';
import '../style/profilecard.css';


export default function ProfileCard({childRefs,index,profile, swiped, outOfFrame, id,handleClickInfoButton}){

    let profileDescription = profile.description.split('').length >50 ? profile.description.slice(0,50)+'...':profile.description

    return(
        <Card
        ref={childRefs[index]}
        className='swipe'
        key={profile.name}
        onSwipe={(dir) => swiped(dir, profile, index,id)}
        onCardLeftScreen={() => outOfFrame(profile.name, index)}
      >
        <div className='card'>
          <h3 className='name-age'>{profile.name} {profile.age}</h3>
          <img className='img' src={profile.image}/>
          <div className='description-text'>{profileDescription}</div>
          <img className='info-icon' onClick={handleClickInfoButton} src={info} />
        </div>
      </Card>
    )
}