import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import logo from '../img/heart-ghost.png'
import '../style/header.css';
import Sidebar from './Sidebar';
import reset from '../img/reset-icon.png';
import axios from "axios";
import homeIcon from '../img/home-icon.png';
import helpIcon from '../img/help-icon.png';
import InfoModal from './InfoModal';


let undoUrl = '/reset'


function Header({ matches, setMatches, user, showInfoModal, setShowInfoModal, handleAllModals,handleLogOut,signedIn,setUser }) {

  let history = useHistory();

  function handleResetClick() {
    axios.patch(undoUrl)
      .then(r => {
        history.push('/')
        window.location.reload()
      })
  }

  function handleHomeClick() {
    history.push('/')
  }

  function handleInfoClick() {
    handleAllModals()
    setShowInfoModal(!showInfoModal)
  }

  return (
    <div>
      <Sidebar
        pageWrapId={'page-wrap'}
        outerContainerId={'outer-container'}
        width={"500px"}
        matches={matches}
        setMatches={setMatches}
        user={user}
        setUser={setUser}
        handleLogOut={handleLogOut}
        signedIn={signedIn}
      />
      {showInfoModal ? <InfoModal user={user} setShowInfoModal={setShowInfoModal} /> : null}

      <div className="header">
        <div className='header-container'>

          <img
            src={logo}
            alt="Logo" className="header-logo"
            hidden={showInfoModal ? 'true' : null}
          />

          <div
            className="header-title" hidden={showInfoModal ? 'true' : null}
          >Ghostd</div>

          <img
            src={helpIcon}
            className='help-icon'
            onClick={handleInfoClick}
          />

          <img
            src={homeIcon}
            className='home-icon'
            onClick={handleHomeClick}
          />


          <img
            src={reset}
            className='reset-button'
            onClick={handleResetClick}
          />

        </div>
      </div>
    </div>
  );
}

export default Header;