import React from 'react';

const CurrentRoundHeader = ({ roundData, players }) => {
  const { inProgress, finished, allScoresSubmitted, newRoundReady } = roundData;
  let currentRoundWinner;
  currentRoundWinner = players.find(p => p._id === roundData.winner);

  return (
    <div>
      <h2>Current Round: {roundData ? roundData.roundNumber : '...'}</h2>

      {!inProgress && !finished && (
        <p>
          New Round! <br />
          Waiting on Gamemaster to start round...
        </p>
      )}

      {inProgress && !finished && <p>Round has begun!!!</p>}

      {!inProgress && finished && (
        <p>
          Round is over!
          <br />
          {roundData.winner && `${currentRoundWinner.name} has won.`}
          <br />
          Please enter your score below.
        </p>
      )}
      {newRoundReady && allScoresSubmitted && (
        <p>
          All scores have updated! Waiting on Gamemaster to go to next round...
        </p>
      )}
    </div>
  );
};

export default CurrentRoundHeader;
