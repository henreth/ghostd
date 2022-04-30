import React, { useState } from 'react';
import { elastic as Menu } from 'react-burger-menu';
import './sidebar.css';
import MiniCard from '../MiniCard/MiniCard';
import SideBarMoreMatchInfo from '../SideBarMoreMatchInfo/SideBarMoreMatchInfo';
import MoreProfileInfo from '../MoreUserInfo/MoreUserInfo';
import LikeCounter from '../LikeCounter/LikeCounter';
import userPhoto from '../../img/user-photo.png'
import location from '../../img/location_icon.png';


function Sidebar({ matches, setMatches, user, setUser, signedIn, handleLogOut, likeCount, setLikeCount, setProfiles, setCurrentIndex, setLastPerson }) {
    let [showMoreUserInfo, setShowMoreUserInfo] = useState(false);
    let [showMoreProfileInfo, setShowMoreProfileInfo] = useState(false);
    let [selectedMatch, setSelectedMatch] = useState(user);



    function handleClickUser() {
        setShowMoreUserInfo(!showMoreUserInfo)
        setShowMoreProfileInfo(false)
    }


    let matchesFirstColumn = matches.filter((match, index) => index % 2 === 0)
    let matchesSecondColumn = matches.filter((match, index) => index % 2 !== 0)

    let firstColumnToDisplay = matchesFirstColumn.map((match) => {
        return (
            //update to fetch individual profiles
            <MiniCard
                key={match.name}
                profile={match}
                showMoreProfileInfo={showMoreProfileInfo}
                setShowMoreProfileInfo={setShowMoreProfileInfo}
                setSelectedMatch={setSelectedMatch}
                setShowMoreUserInfo={setShowMoreUserInfo}
            />
        )
    })

    let secondColumnToDisplay = matchesSecondColumn.map((match) => {
        return (
            //update to fetch individual profiles
            <MiniCard
                key={match.name}
                profile={match}
                showMoreProfileInfo={showMoreProfileInfo}
                setShowMoreProfileInfo={setShowMoreProfileInfo}
                setSelectedMatch={setSelectedMatch}
                setShowMoreUserInfo={setShowMoreUserInfo}
            />
        )
    })

    let likeCountToDisplay = likeCount != 0 ? <LikeCounter likeCount={likeCount} /> : null



    return (
        <div className='menu-holder'>
            <Menu>
                {showMoreUserInfo ? <MoreProfileInfo
                    showMoreProfileInfo={showMoreUserInfo}
                    setShowMoreProfileInfo={setShowMoreUserInfo}
                    profile={user}
                    setUser={setUser}
                    signedIn={signedIn}
                    handleLogOut={handleLogOut}
                    setLikeCount={setLikeCount}
                    setMatches={setMatches}
                    setProfiles={setProfiles}
                    setCurrentIndex={setCurrentIndex}
                    setLastPerson={setLastPerson} /> : null}
                {showMoreProfileInfo ? <SideBarMoreMatchInfo
                    matches={matches}
                    setMatches={setMatches}
                    showMoreProfileInfo={showMoreProfileInfo}
                    setShowMoreProfileInfo={setShowMoreProfileInfo}
                    profile={selectedMatch}
                    nameLength={selectedMatch.name.length}
                    locationLength={selectedMatch.name.length}
                    descriptionLength={selectedMatch.description.length} /> : null}
                <img src={userPhoto} onClick={handleClickUser} className='profile-photo-sidebar' />
                <a className="spacing-menu-item">'</a>
                <div className='profile-name-sidebar'>{user.name}</div>
                <img className='profile-location-icon-sidebar' src={location} />
                <div className='profile-location-sidebar'>{user.location}</div>
                <div className='sidebar-title'>
                    <div className="large-menu-item" >Matches</div>
                </div>

                <div className='minicards-container'>
                    {likeCountToDisplay}
                    {firstColumnToDisplay}
                </div>
                <div className='minicards-container-secondColumn'>
                    {secondColumnToDisplay}
                </div>

            </Menu>
        </div>
    );
};

export default Sidebar;