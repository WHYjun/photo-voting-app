import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Photos from "../Photos";

const FlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  --h: 40vh;
  .photo-item {
    border: 1px solid black;
    overflow: hidden;
    position: relative;
  }
  .photo {
    width: 100%;
    height: 100%;
  }
  .photo:hover {
    opacity: 0.8;
  }
  .vs {
    font-size: calc((var(--h) / 3));
  }
`;

const Tournament = () => {
  const [lineup, setLineup] = useState([]);
  const [matchup, setMatchup] = useState([]);
  const [winners, setWinners] = useState([]);

  let photos = [];
  let title;

  useEffect(() => {
    photos = Photos;
    setLineup(photos);
    setMatchup([photos[0], photos[1]]);
  }, []);

  const clickEventHandler = (e) => {
    const winner = e.target.currentSrc;
    if (lineup.length > 2) {
      const newLineup = lineup.slice(2);
      setMatchup([newLineup[0], newLineup[1]]);
      setLineup(newLineup);
      setWinners([...winners, winner]);
    } else {
      if (winners.length === 0) {
        /* 
        1. Save the result of tournament to db
        2. Go to the result page to show the winner
        */
        console.log(winner);
      } else {
        setLineup([...winners, winner]);
        setMatchup([lineup[0], lineup[1]]);
        setWinners([]);
        title = `Round of ${lineup.length}`;
      }
    }
  };

  return (
    <>
      <h1>{title}</h1>
      <FlexBox>
        <div
          className="photo-item"
          key={matchup[0]}
          onClick={clickEventHandler}
        >
          <img className="photo" src={matchup[0]} />
        </div>
        <div className="vs">vs</div>
        <div
          className="photo-item"
          key={matchup[1]}
          onClick={clickEventHandler}
        >
          <img className="photo" src={matchup[1]} />
        </div>
      </FlexBox>
    </>
  );
};

export default Tournament;
