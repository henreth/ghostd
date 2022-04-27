import * as BS from 'react-bootstrap'
import React,{ useState } from 'react'
import '../style/infomodal.css'

function InfoModal({ setShowInfoModal,user }) {
    const [openInfoModal, setOpenInfoModal] = useState(true)

    function handleClose() {
        setOpenInfoModal(!openInfoModal)
        setShowInfoModal(false)
    }

    return (
        <React.Fragment> 
            <div className={openInfoModal?'infomodal-curtain':'hidden'}>-</div>
            <BS.Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={openInfoModal}
                onHide={handleClose}
                // backdrop='static'
                style={{ 
                    animation: 'fadeInAnimation ease .4s',
                    animationIterationCount: '1',
                    animationFillMode: 'forwards',
                    zIndex:'1000', borderRadius: '30px', backgroundColor: 'rgba(0, 0, 0, 0.75)', width:'50%', position:'absolute',marginLeft:'360px', marginTop:'-800px'}}
            >
                <BS.Modal.Body style={{ padding: '80px',paddingLeft:'70px',textAlign: "center", opacity: '1', color: '#fff', background: ''}}>
                    <div className='text-holder'>
                        <strong style={{marginLeft:'35px', fontSize:'70px'}}>WELCOME TO </strong>
                        <strong className= 'title-logo' style={{marginLeft:'35px', fontSize:'80px', paddingBottom:'30px'}}>GHOSTD</strong>
                        <strong style={{position: 'absolute', marginLeft: '-390px', marginTop: '120px', fontSize:'20px'}}>A Dating App for the Deceased</strong>
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

                        {/* <InfoCard profile={user}/>
                            <div className='info-buttons'>
                                <img className="info-reject-button" alt='reject' src={reject} />
                                <img className="info-undo-button"  alt='undo' src={undo} />
                                <img className="info-like-button" alt='heart' src={heart} />
                            </div> */}
                        <hr></hr>
                        {/* <div style={{marginTop:'420px'}}></div> */}
                        <button className='exit-button' onClick={handleClose}>JOIN US</button>
                    </div>
                </BS.Modal.Body>
            </BS.Modal>
        </React.Fragment>

    )
}

export default InfoModal