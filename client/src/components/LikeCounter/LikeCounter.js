import React, { useEffect, useState } from 'react'
import './likecounter.css';
import { Route, Link, useHistory } from "react-router-dom";
import axios from 'axios';


function LikeCounter ({likeCount}) {
    let history = useHistory();

    function handleClick(){
        history.push(`/`)
    }


    return (
        <div className='likecounter-Container'>
                <div className='likecounter-card'>
                    <div className='likecounter-name'>{likeCount}</div>
                </div>
      </div>
    )
}

export default LikeCounter;