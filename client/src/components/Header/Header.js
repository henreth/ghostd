import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import logo from '../../img/heart-ghost.png'
import './header.css';
import Sidebar from '../SideBar/Sidebar';
import axios from "axios";
import homeIcon from '../../img/home-icon.png';
import helpIcon from '../../img/help-icon.png';
import InfoModal from '../InfoModal/InfoModal';

function Header({ matches, setMatches, user, showInfoModal, setShowInfoModal, handleAllModals,handleLogOut,signedIn,setUser, likeCount, setLikeCount, setProfiles, setCurrentIndex, setLastPerson }) {

  let history = useHistory();

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
        matches={matches}
        setMatches={setMatches}
        user={user}
        setUser={setUser}
        handleLogOut={handleLogOut}
        signedIn={signedIn}
        likeCount={likeCount}
        setLikeCount={setLikeCount}
        setProfiles={setProfiles}
        setCurrentIndex={setCurrentIndex}
        setLastPerson={setLastPerson}
      />
      {showInfoModal ? <InfoModal user={user} setShowInfoModal={setShowInfoModal} /> : null}

      <div className="header">
        <div className='header-container'>

          <div className="header-title">Ghostd</div>
          <img
            src={logo}
            alt="Logo" 
            className="header-logo"
          />

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


        </div>
      </div>
    </div>
  );
}

export default Header;