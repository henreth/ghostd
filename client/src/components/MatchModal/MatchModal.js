import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import confetti from "canvas-confetti";
import './matchmodal.css'
import userPhoto from '../../img/user-icon.png'

function MatchModal({ setShowMatchModal, user, profile }) {
    const charImages = require.context('../../img/characters', true);
    const [openMatchModal, setOpenMatchModal] = useState(true)
    const history = useHistory()

    function handleClose() {
        setOpenMatchModal(!openMatchModal)
        setShowMatchModal(false)
        confetti.reset()
    }

    function handleGoToProfile() {
        history.push('/match/' + profile.id)
        history.go(0)
        setShowMatchModal(false)
    }

    let count = 200;
    let defaults = {
        origin: { y: 0.9 }
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.35, {
        spread: 36,
        startVelocity: 65,
    });
    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
    fire(0.05, {
        spread: 130,
        startVelocity: 55,
    });

    return (
        <React.Fragment>
            <div className={openMatchModal ? 'infomodal-curtain' : 'hidden'}>-</div>
            <div className='information-modal-container'>
                <div className='text-holder'>
                    <div className='text-holder'>
                        <strong className='itsamatch'>IT'S A MATCH!</strong>
                        <strong className='match-subtitle'> YOU AND {profile.name} LIKED ONE ANOTHER</strong>
                        <div className='match-images'>
                            <img className='match-image userimage' src={userPhoto} />
                            <img className='match-image' src={charImages('./' + profile.image)} />
                        </div>
                        <hr></hr>
                        <div></div>
                        <button className='redirect-button' onClick={handleGoToProfile}>GO TO PROFILE</button>
                        <button className='swipe-button' onClick={handleClose}>KEEP SWIPING</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MatchModal