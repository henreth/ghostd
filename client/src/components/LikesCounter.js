import React from 'react'
import '../style/likceounter.css';
import { Route, Link, useHistory } from "react-router-dom";
import cancel from '../img/cancel-icon.png';


function LikeCounter ({profile,showMoreProfileInfo,setShowMoreProfileInfo,setSelectedMatch,setShowMoreUserInfo}) {

    let history = useHistory();

    function handleClick(){
        history.push(`/`)
        window.location.reload()
    }


    return (
        <div className='likecounter-Container'>
                <div className='likecounter-card'>
                    <div className='likecounter-name'>{}</div>
                </div>
      </div>
    )
}

export default LikeCounter;