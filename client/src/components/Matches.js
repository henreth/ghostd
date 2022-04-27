import React, { useState } from 'react'
import '../style/matches.css';
import MediumCard from './MediumCard';
import LargeCard from './LargeCard';
import MoreMatchInfo from './MoreMatchInfo';
import heart from '../img/real_heart.png';



function Matches({ matches, user, setMatches }) {
    document.title = 'Ghostd - Matches'

    let [showMoreProfileInfo, setShowMoreProfileInfo] = useState(false);
    let [selectedMatch, setSelectedMatch] = useState(user);

    const [search, setSearch] = useState('');

    function handleChange(event) {
        setSearch(event.target.value);
    }

    function chunk(array, limit) {
        if (array.length <= limit) return [array];
        const perChunk = Math.ceil(array.length / Math.ceil(array.length / limit));
        return [array.slice(0, perChunk)].concat(chunk(array.slice(perChunk), limit));
      }

    let splitMatches = chunk(matches,5)

    function displayMatchesRow(data) {
        return <div className='matches-carousel'>
            {data.map(match => {
                return (
                    //update to fetch individual profiles
                    <MediumCard
                        key={match.name}
                        profile={match}
                        showMoreProfileInfo={showMoreProfileInfo}
                        setShowMoreProfileInfo={setShowMoreProfileInfo}
                        setSelectedMatch={setSelectedMatch} />);
            })}
        </div>;
    }

    function displayMatches(data) {
        return data.map(row=> {
            return(
                <React.Fragment>
                    {displayMatchesRow(row)}
                </React.Fragment>
            )
        })

        // if (data.length >= 20) {
        //     return (
        //         <React.Fragment>
        //             {displayMatchesRow(data.slice(0, 5))}
        //             {displayMatchesRow(data.slice(5, 10))}
        //             {displayMatchesRow(data.slice(10, 15))}
        //             {displayMatchesRow(data.slice(15, 20))}
        //             {displayMatchesRow(data.slice(20,))}
        //         </React.Fragment>
        //     )
        // } else if (data.length >= 15) {
        //     return (
        //         <React.Fragment>
        //             {displayMatchesRow(data.slice(0, 5))}
        //             {displayMatchesRow(data.slice(5, 10))}
        //             {displayMatchesRow(data.slice(10, 15))}
        //             {displayMatchesRow(data.slice(15,))}
        //         </React.Fragment>
        //     )
        // } else if (data.length >= 10) {
        //     return (
        //         <React.Fragment>
        //             {displayMatchesRow(data.slice(0, 5))}
        //             {displayMatchesRow(data.slice(5, 10))}
        //             {displayMatchesRow(data.slice(10,))}
        //         </React.Fragment>
        //     )
        // } else if (data.length >= 5) {
        //     return (
        //         <React.Fragment>
        //             {displayMatchesRow(data.slice(0, 5))}
        //             {displayMatchesRow(data.slice(5,))}
        //         </React.Fragment>
        //     )
        // } else {
        //     return (
        //         <React.Fragment>
        //             {displayMatchesRow(data)}
        //         </React.Fragment>
        //     )
        // }
    }

    function handleSearchClick(event){
        event.preventDefault();
    }

    return (
        <React.Fragment>
            {showMoreProfileInfo ? <React.Fragment><div className='matches-moreMatchInfo-curtain'>-</div> <MoreMatchInfo size={'m'} matches={matches} setMatches={setMatches} showMoreProfileInfo={showMoreProfileInfo} setShowMoreProfileInfo={setShowMoreProfileInfo} profile={selectedMatch} nameLength={selectedMatch.name.length} locationLength={selectedMatch.location.length} /></React.Fragment> : null}
            <h1 className='matches-title'>Matches</h1>
            <div className="search-container">
                <form
                    className='search-form'
                >
                    <input
                        type='text'
                        onChange={handleChange}
                        className="search-input"
                        placeholder='Name, Location, Age...'
                        autoComplete='off'
                        cursor='pointer'
                    />
                    <button
                        className="search-button">
                        <img src="https://www.kindacode.com/wp-content/uploads/2020/12/search.png"
                        onClick={handleSearchClick}
                        />

                    </button>
                </form>
            </div>

            <div className='matches-container'>
                {displayMatches(splitMatches)}
            </div>
        </React.Fragment>
    );

}

export default Matches;