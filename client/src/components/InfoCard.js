import React from 'react'
import '../style/infocard.css';
import { Route, Link, useHistory } from "react-router-dom";
import info from '../img/info-icon.png';
import location from '../img/location_icon.png';



function InfoCard ({profile}) {
    return (
        <div className='med-cardContainer'>
                <div
                    className='med-card'
                >
                    {/* <div className='mini-name'>{profile.name}</div> */}
                    <img className='med-img' src={profile.image}/>

                </div>
      </div>
    )
}

export default InfoCard;