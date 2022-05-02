import React, { useState, useMemo, useRef, useEffect } from 'react'
import './homepage.css';
import axios from 'axios';
import undo from '../../img/reboot-icon.png';
import heart from '../../img/real_heart.png';
import reject from '../../img/bones-icon.png';
import ProfileCard from '../ProfileCard/ProfileCard'
import Card from '../ProfileCard/Card';
import info from '../../img/info-icon.png';
import MatchModal from '../MatchModal/MatchModal';
import MoreProfileInfo from '../MoreProfileInfo/MoreProfileInfo';


// posts 
// upon swiping either direction, creates a 'like' model for the user and targeted profile
let likeUrl = '/like'
let dislikeUrl = '/dislike'

//patches
// upon clicking the undo button, this resets the 'like' model for the user and targeted profile
let undoUrl = '/undo'


function HomePage({ profiles, setProfiles,currentIndex, setCurrentIndex, lastPerson, setLastPerson, peopleUrl, user, matches, setMatches, showMatchModal, setShowMatchModal, handleAllModals, likeCount, setLikeCount }) {
  document.title = 'Ghostd - Home'

  let [userx, setUserx] = useState('')
  useEffect(() => {
    axios.get('/me')
      .then(r => setUserx(r.data))
  }, [])
  let id = userx.id

  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = Array(profiles.length)
    .fill(0)
    .map((i) => React.createRef())

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < profiles.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  function swiped(direction, profile, index, id) {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
    // console.log(profiles[index].id)

    if (direction === 'right') {
      axios.patch(likeUrl, {
        user_id: id,
        profile_id: profiles[index].id
      })
        .then(r => {
          switch (r.data) {
            case false:
              break;
            case true:
              setShowMatchModal(true);
              setMatches([...matches, profiles[index]])
              setLikeCount(likeCount-1)
              break;
          }
        })

    } else if (direction === 'left') {
      axios.patch(dislikeUrl, {
        user_id: id,
        profile_id: profiles[index].id
      })
      .then(r=>{
        switch (r.data) {
          case false:
            break;
          case true:
            setLikeCount(likeCount-1)
            break;
        }      
      })
    }
    setLastPerson(profiles[index - 1])
  }


  const outOfFrame = (name, idx) => {
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
  }

  let swipe = async (dir, profile) => {
    if (canSwipe && currentIndex < profiles.length) {
      await childRefs[currentIndex].current.swipe(dir) // swipe card
      if (dir === 'right') {

      } else if (dir === 'left') {

      }
    }

  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
    setLastPerson(profiles[newIndex])
    axios.patch(undoUrl, {
      user_id: id,
      profile_id: profiles[newIndex].id
    })
    .then(r=>{
      switch (r.data) {
        case false:
          break;
        case true:
          setLikeCount(likeCount+1)
          break;
      }      
    })
    setMatches(matches.filter(match => {
      return match.id !== profiles[newIndex].id
    }))
  }

  let [showMoreProfileInfo, setShowMoreProfileInfo] = useState(false);
  function handleClickInfoButton() {
    setShowMoreProfileInfo(true)
  }

  let cardsToDisplay = profiles.map((profile, index) => (
    <ProfileCard
      key={profile.name}
      childRefs={childRefs}
      index={index}
      swiped={swiped}
      outOfFrame={outOfFrame}
      id={id}
      profile={profile}
      handleClickInfoButton={handleClickInfoButton} />
  ))


  return (
    <React.Fragment>
      <div>
        {showMatchModal ? <MatchModal user={userx} profile={profiles[currentIndex + 1]} setShowMatchModal={setShowMatchModal} /> : null}
        {showMoreProfileInfo ? <React.Fragment><div className='infomodal-curtain'>-</div> <MoreProfileInfo showMoreProfileInfo={showMoreProfileInfo} setShowMoreProfileInfo={setShowMoreProfileInfo} profile={lastPerson} nameLength={lastPerson.name.length} locationLength={lastPerson.location.length} /></React.Fragment> : null}
        <div className='cardContainer'>
          {cardsToDisplay}
        </div>
        <div className='buttons'>
          <img className={canSwipe ? "reject-button" : "frozen-reject-button"} onClick={() => swipe('left')} alt='reject' src={reject} />
          <img className={canGoBack ? "undo-button" : "frozen-undo-button"} onClick={() => goBack()} alt='undo' src={undo} />
          <img className={canSwipe ? "like-button" : "frozen-like-button"} onClick={() => swipe('right')} alt='heart' src={heart} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default HomePage