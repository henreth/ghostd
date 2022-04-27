import * as BS from 'react-bootstrap'
import React,{ useState } from 'react'
import { useHistory } from 'react-router-dom'
import confetti from "canvas-confetti";
import '../style/matchmodal.css'
import userPhoto from '../img/user-icon.png'



function MatchModal({ setShowMatchModal, user, profile}) {
    const [openMatchModal, setOpenMatchModal] = useState(true)
    const history = useHistory()

    function handleClose() {
        setOpenMatchModal(!openMatchModal)
        setShowMatchModal(false)
        confetti.reset()
    }

    function handleGoToProfile() {
        history.push('/match/'+profile.id)
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
            <div className={openMatchModal?'matchmodal-curtain':'hidden'} style={{transition: '1s ease-in-out'}}>-</div>
            <BS.Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={openMatchModal}
                onHide={handleClose}
                // backdrop='static'
                style={{
                    animation: 'fadeInAnimation ease .5s',
                    animationIterationCount: '1',
                    animationFillMode: 'forwards',
                    borderRadius: '30px', zIndex:1000, backgroundColor: 'rgba(0, 0, 0, 0.75)', width:'50%', position:'absolute',marginLeft:'370px', marginTop:'-790px'}}
            >
                                    {/* <div style={{marginTop:'100px'}}></div> */}

                <BS.Modal.Body style={{ padding: '80px',paddingLeft:'70px',textAlign: "center", opacity: '1', color: 'white', background: ''}}>
                    <div className='text-holder'>
                        <strong className='itsamatch' style={{marginLeft:'35px', fontSize:'70px', fontFamily:"Nosifer, cursive;"}}>IT'S A MATCH!</strong>
                        <strong style={{marginLeft: '40px', fontSize:'20px'}}> YOU AND {profile.name.toUpperCase()} LIKED ONE ANOTHER</strong>
                        <img className = 'match-user-image' src={userPhoto}/>
                        <img className = 'match-profile-image' src={profile.image}/>
                        <hr></hr>
                        <div style={{marginTop:'420px'}}></div>
                        <button className='redirect-button' onClick={handleGoToProfile}>GO TO PROFILE</button>
                        <button className='swipe-button' onClick={handleClose}>KEEP SWIPING</button>
                    </div>
                </BS.Modal.Body>
            </BS.Modal>
        </React.Fragment>
    )
}

export default MatchModal