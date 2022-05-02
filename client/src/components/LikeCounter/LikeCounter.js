import React, { useEffect, useState } from 'react'
import './likecounter.css';
import { Route, Link, useHistory } from "react-router-dom";
import axios from 'axios';


function LikeCounter ({likeCount}) {
    let history = useHistory();

    let likeMsg = likeCount == 1 ? 'Match Left': 'Matches'
    return (
        <div className='likecounter-Container'>
                <div className='likecounter-card'>
                    <div className='likecounter-total'>{likeCount}</div>
                    <div className='likecounter-title'>Potential</div>
                    <div className='likecounter-title'>{likeMsg}</div>
                </div>
      </div>
    )
}

export default LikeCounter;