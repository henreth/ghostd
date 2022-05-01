import React, { useState } from 'react'
import './infomodal.css'

function InfoModal({ setShowInfoModal, user }) {
    const [openInfoModal, setOpenInfoModal] = useState(true)

    function handleClose() {
        setOpenInfoModal(!openInfoModal)
        setShowInfoModal(false)
    }

    return (
        <React.Fragment>
            <div className={openInfoModal ? 'infomodal-curtain' : 'hidden'}>-</div>
            <div className='information-modal-container'>
                <div className='text-holder'>
                    <strong className='title-intro'>WELCOME TO </strong>
                    <strong className='title-logo'>GHOSTD</strong>
                    <strong className='title-subtitle'>A Dating App for the Deceased</strong>
                    <hr></hr>
                    <div className='info-text start'>It's hard to meet the perfect partner after you've died. Seperated from mortal coil and social convention, dating can seem like a maze from which there is no solace... </div> 
                    <div className='info-text middle'> Fear no more, <span>GHOSTD</span> is the afterlife's first dating app by ghosts,
                        for ghosts, for our unique social needs.</div>
                    {/* <div className='info-text line' >Our app is easy and intuitive, even for ghosts thousands of years dead.</div> */}
                    <div className='info-text line'>Simply swipe right on the profile if you like what your cold eyes see, or swipe left to see the next profile. Make a mistake? No matter at all, simply click the green button under the profile.</div>
                    <div className='info-text end' >Millions of ghosts are swiping now, but there's room for <span>one more...</span></div>
                    <hr></hr>
                    <button className='info-exit-button' onClick={handleClose}>JOIN US</button>
                </div>
            </div>
        </React.Fragment>

    )
}

export default InfoModal