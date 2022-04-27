import React, { useState } from 'react'
import '../style/infomodal.css'

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
                    <div className='spacer'>-</div>
                    <hr></hr>
                    <p>It's hard to meet the perfect partner after you've died. Seperated from mortal
                        coil and social convention, dating can seem like a maze from which there is
                        no solace. Fear no more, GHOSTD is the afterlife's first dating app by ghosts,
                        for ghosts, for our unique social needs.</p>
                    <div className='spacer'>-</div>
                    <p>Our app is easy and intuitive, even for ghosts thousands of years dead. Simply
                        swipe right on the profile if you like what your cold eyes see, or swipe left
                        to see the next profile. Make a mistake? No matter at all, simply click
                        the green button under the profile.</p>
                    <div className='spacer'>-</div>
                    <p>Millions of ghosts are swiping now, but there's room for one more...</p>
                    <hr></hr>
                    <button className='exit-button' onClick={handleClose}>JOIN US</button>
                </div>
            </div>
        </React.Fragment>

    )
}

export default InfoModal