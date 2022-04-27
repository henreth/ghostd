import React, { useState, useEffect } from 'react'
import { Route, Switch } from "react-router-dom";
import axios from 'axios';
import '../style/app.css';
import Header from './Header';
import HomePage from './HomePage';
import Matches from './Matches';
import SelectedProfile from './SelectedProfile';
import '../components/InfoModal'

//Endpoints:

// 1 < Results
//gets

//unswiped profiles (base data)
let unswipesUrl = 'http://localhost:4000/unswiped_profiles'

//everyone (swiped/unswiped)
let peopleUrl = 'http://localhost:4000/profiles'

// all likes
let likesUrl = 'http://localhost:4000/likes'

//all matches
let matchesUrl = 'http://localhost:4000/matches'

// Single results
//gets the user 
let userUrl = 'http://localhost:4000/user'
//gets a specific profile
let profileUrl = 'http://localhost:4000//profile/:id'

// posts 
// upon swiping either direction, creates a 'like' model for the user and targeted profile
let likeUrl = 'http://localhost:4000/like'
let dislikeUrl = 'http://localhost:4000/dislike'

//patches
// upon clicking the undo button, this resets the 'like' model for the user and targeted profile
let undoUrl = 'http://localhost:4000/undo'

// patching to this will reset all information
let resetUrl = 'http://localhost:4000/reset'
let unmatchUrl = 'http://localhost:4000/unmatch'


function App () {

  let [db,setDB] = useState([]);
  let [likes,setLikes] = useState([]);
  let [matches,setMatches] = useState([]);
  let [user, setUser] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastPerson, setLastPerson] = useState({})

  let [showMatchModal, setShowMatchModal] = useState(false);
  let [showInfoModal, setShowInfoModal] = useState(false);

  function handleAllModals(){
    setShowMatchModal(false)
    setShowInfoModal(false)
  }


  useEffect(()=>{
    axios.get(unswipesUrl)
    .then(r=>{
      setDB(r.data)
      // console.log(r.data)
      setCurrentIndex(r.data.length-1)
      setLastPerson(r.data[r.data.length-1])

    axios.get(likesUrl)
    .then(r=>{
      // console.log(r.data)
      setLikes(r.data)})

    axios.get(matchesUrl)
    .then(r=>{
      setMatches(r.data)
      // console.log(r.data)
    })

    axios.get(userUrl)
    .then(r=>{
      setUser(r.data)
      // console.log(r.data)
    })
  })
  },[])

  return (
    <React.Fragment>
      <Header
        matches = {matches}
        setMatches = {setMatches}
        showMatchModal={showMatchModal}
        setShowMatchModal={setShowMatchModal}
        showInfoModal={showInfoModal}
        setShowInfoModal={setShowInfoModal}
        user={user}
        handleAllModals={handleAllModals}
        />
      <div className='main-page'>
      <Switch>
          <Route exact path="/">
            <HomePage 
              db = {db}
              setDB={setDB}
              likes={likes}
              setLikes={setLikes}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              lastPerson={lastPerson}
              setLastPerson={setLastPerson}
              peopleUrl={peopleUrl}
              likesUrl={likesUrl}
              matches={matches}
              setMatches={setMatches}
              user={user}
              showMatchModal={showMatchModal}
              setShowMatchModal={setShowMatchModal}
              handleAllModals={handleAllModals}
              />
          </Route>
          <Route path ="/matches">
              <Matches 
                  user={user}
                  matches = {matches}
                  setMatches = {setMatches} 
              />
          </Route>
          <Route exact path ='/match/:profileId'>
              <SelectedProfile
                  matches={matches}
                  setMatches={setMatches}                
              />
          </Route>

        </Switch>
      </div>

    </React.Fragment>
  )
}

export default App