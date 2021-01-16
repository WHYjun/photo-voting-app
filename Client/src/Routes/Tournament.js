import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Photos from "../Photos";
import axios from "axios";
import { useHistory } from "react-router-dom";

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

const Button = styled.button``;

const Text = styled.text``;

const Tournament = () => {
  const history = useHistory();
  let user;

  if (history.location.state === undefined) {
    history.push("/");
  } else {
    if (history.location.state.username === undefined) {
      history.push("/");
    } else {
      user = history.location.state.username;
    }
  }

  const [lineup, setLineup] = useState([]);
  const [matchup, setMatchup] = useState([]);
  const [winners, setWinners] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  let photos = [];

  useEffect(() => {
    photos = Photos;
    setLineup(photos);
    setMatchup([photos[0], photos[1]]);
  }, []);

  const voteHandler = async (e) => {
    const winner = e.target.currentSrc;
    if (lineup.length > 2) {
      const newLineup = lineup.slice(2);
      setMatchup([newLineup[0], newLineup[1]]);
      setLineup(newLineup);
      setWinners([...winners, winner]);
    } else {
      if (winners.length === 0) {
        await axios
          .post("/winner", { winner, user })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      } else {
        setLineup([...winners, winner]);
        setWinners([]);
        setIsComplete(true);
      }
    }
  };

  const nextRoundHandler = (_) => {
    setMatchup([lineup[0], lineup[1]]);
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <>
        <Text>Round of {lineup.length}</Text>
        <br />
        <Button onClick={nextRoundHandler}>Go to the next round!</Button>
      </>
    );
  } else {
    return (
      <>
        <FlexBox>
          <div className="photo-item" key={matchup[0]} onClick={voteHandler}>
            <img className="photo" src={matchup[0]} alt="First" />
          </div>
          <div className="vs">vs</div>
          <div className="photo-item" key={matchup[1]} onClick={voteHandler}>
            <img className="photo" src={matchup[1]} alt="Second" />
          </div>
        </FlexBox>
      </>
    );
  }
};

export default Tournament;
