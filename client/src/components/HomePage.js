import React, { useState, useMemo, useRef, useEffect } from 'react'
import '../style/homepage.css';
import axios from 'axios';
import undo from '../img/reboot-icon.png';
import heart from '../img/real_heart.png';
import reject from '../img/bones-icon.png';
import ProfileCard from './ProfileCard'
import Card from './Card';
import info from '../img/info-icon.png';
import FakeModal from './MatchModal';
import MoreProfileInfo from './MoreProfileInfo';


// posts 
// upon swiping either direction, creates a 'like' model for the user and targeted profile
let likeUrl = 'http://localhost:4000/like'
let dislikeUrl = 'http://localhost:4000/dislike'

//patches
// upon clicking the undo button, this resets the 'like' model for the user and targeted profile
let undoUrl = 'http://localhost:4000/undo'


function HomePage({ db, setDB, likes, setLikes, currentIndex, setCurrentIndex, lastPerson, setLastPerson, peopleUrl, user, matches, setMatches, showMatchModal, setShowMatchModal, handleAllModals }) {
  document.title = 'Ghostd - Home'
  let [userx, setUserx] = useState('')
  useEffect(() => {
    axios.get('http://localhost:4000/user')
      .then(r => setUserx(r.data))
  }, [])
  let id = userx.id

  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = Array(db.length)
    .fill(0)
    .map((i) => React.createRef())

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  function swiped(direction, profile, index, id) {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
    // console.log(db[index].id)
    console.log(id)

    if (direction === 'right') {
      axios.post('http://localhost:4000/like', {
        user_id: id,
        profile_id: db[index].id
      })
        .then(r => {
          switch (r.data) {
            case false:
              break;
            case true:
              setShowMatchModal(true);
              setMatches([...matches, db[index]])
              break;
          }
        })

    } else if (direction === 'left') {
      axios.post(dislikeUrl, {
        user_id: id,
        profile_id: db[index].id
      })
    }
    setLastPerson(db[index - 1])
  }


  const outOfFrame = (name, idx) => {
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
  }

  let swipe = async (dir, profile) => {
    if (canSwipe && currentIndex < db.length) {
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
    setLastPerson(db[newIndex])
    axios.patch(undoUrl, {
      user_id: id,
      profile_id: db[newIndex].id
    })
    setMatches(matches.filter(match => {
      return match.id !== db[newIndex].id
    }))
  }

  let [showMoreProfileInfo, setShowMoreProfileInfo] = useState(false);
  function handleClickInfoButton() {
    setShowMoreProfileInfo(true)
  }

  let cardsToDisplay = db.map((profile, index) => (
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
        {showMatchModal ? <FakeModal user={userx} profile={db[currentIndex + 1]} setShowMatchModal={setShowMatchModal} /> : null}
        {showMoreProfileInfo ? <React.Fragment><div className='moreProfileInfo-curtain'>-</div> <MoreProfileInfo showMoreProfileInfo={showMoreProfileInfo} setShowMoreProfileInfo={setShowMoreProfileInfo} profile={lastPerson} nameLength={lastPerson.name.length} locationLength={lastPerson.location.length} /></React.Fragment> : null}
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