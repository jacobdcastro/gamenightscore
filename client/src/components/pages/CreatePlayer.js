import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPlayer } from '../../redux/actions/player';
import { getGameData } from '../../redux/actions/game';
import PropTypes from 'prop-types';

import CreatePlayerWrapper from '../../styles/pages/CreatePlayer.sty.js';
// import blueWell from '../../assets/deck-icons/expansion-pack/blue-well.svg';
// import greenBucket from '../../assets/deck-icons/expansion-pack/green-bucket.svg';
// import orangeHoe from '../../assets/deck-icons/expansion-pack/orange-hoe.svg';
// import yellowWagon from '../../assets/deck-icons/expansion-pack/yellow-wagon.svg';
// import blueHoe from '../../assets/deck-icons/original-pack/blue-hoe.svg';
// import greenWell from '../../assets/deck-icons/original-pack/green-well.svg';
// import orangeWagon from '../../assets/deck-icons/original-pack/orange-wagon.svg';
// import yellowBucket from '../../assets/deck-icons/original-pack/yellow-bucket.svg';

const CreatePlayer = ({
  createPlayer,
  getGameData,
  gameId,
  isGamemaster,
  isCreated,
  isAuthenticated,
}) => {
  const [formData, setFormData] = useState({
    isGamemaster,
    gameId,
    name: '',
    pin: '',
    deck: '',
  });

  // const [deckSelector, setDeckSelector] = useState({
  //   blueHoe: 'unselected',
  //   greenWell: 'unselected',
  //   orangeWagon: 'unselected',
  //   yellowBucket: 'unselected',
  //   blueWell: 'unselected',
  //   greenBucket: 'unselected',
  //   orangeHoe: 'unselected',
  //   yellowWagon: 'unselected',
  // }); // options: "selected", "unselected", "taken"

  const { name, pin } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createPlayer(formData);
    console.log(formData);
  };

  // const handleDeckSelection = deck => {
  //   setDeckSelector((deckSelector[deck] = 'selected'));
  // };

  if (isAuthenticated && isCreated) {
    getGameData(gameId);
    return <Redirect to="/lobby" />;
  }

  return (
    <CreatePlayerWrapper>
      <h1 className="dutchBlitzLogo">Dutch Blitz</h1>
      <p>Create your player!</p>
      <p>If you're joining a game that's already begun, you can still join.</p>

      <form id="joinGameForm" onSubmit={e => onSubmit(e)}>
        <div className="textInput">
          <label htmlFor="title">Title of Game</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Username"
            value={name}
            onChange={e => onChange(e)}
            required
          />
          <small>How do you want to be known?</small>
        </div>
        <div className="textInput">
          <label htmlFor="pin">Pin</label>
          <input
            id="pin"
            type="password"
            name="pin"
            placeholder="4-digit PIN"
            value={pin}
            onChange={e => onChange(e)}
            required
          />
          <small>
            If you leave the app, you can come back and sign back in using your
            pin!
          </small>
        </div>
        {/* <div className="deckBtns">
          <div onClick={() => handleDeckSelection('blueHoe')} id="blueHoe">
            <img
              src={blueHoe}
              title="Select this deck"
              alt="blue hoe dutch blitz icon"
            />
          </div>

          <div onClick={() => handleDeckSelection('greenWell')} id="greenWell">
            <img
              src={greenWell}
              title="Select this deck"
              alt="green well icon"
            />
          </div>

          <div
            onClick={() => handleDeckSelection('orangeWagon')}
            id="orangeWagon"
          >
            <img
              src={orangeWagon}
              title="Select this deck"
              alt="orange wagon icon"
            />
          </div>

          <div
            onClick={() => handleDeckSelection('yellowBucket')}
            id="yellowBucket"
          >
            <img
              src={yellowBucket}
              title="Select this deck"
              alt="yellow bucket icon"
            />
          </div>

          <div onClick={() => handleDeckSelection('blueWell')} id="blueWell">
            <img
              src={blueWell}
              title="Select this deck"
              alt="blue well dutch blitz icon"
            />
          </div>

          <div
            onClick={() => handleDeckSelection('greenBucket')}
            id="greenBucket"
          >
            <img
              src={greenBucket}
              title="Select this deck"
              alt="green bucket icon"
            />
          </div>

          <div onClick={() => handleDeckSelection('orangeHoe')} id="orangeHoe">
            <img
              src={orangeHoe}
              title="Select this deck"
              alt="orange hoe icon"
            />
          </div>

          <div
            onClick={() => handleDeckSelection('yellowWagon')}
            id="yellowWagon"
          >
            <img
              src={yellowWagon}
              title="Select this deck"
              alt="yellow wagon icon"
            />
          </div>
        </div> */}
        <button type="submit">Enter Game Lobby</button>
      </form>
    </CreatePlayerWrapper>
  );
};

CreatePlayer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isGamemaster: PropTypes.bool.isRequired,
  isCreated: PropTypes.bool.isRequired,
  gameId: PropTypes.string.isRequired,
  createPlayer: PropTypes.func.isRequired,
  getGameData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.player.isAuthenticated,
  isGamemaster: state.player.isGamemaster,
  isCreated: state.player.isCreated,
  gameId: state.game._id,
  createPlayer,
  getGameData,
});

export default connect(
  mapStateToProps,
  { createPlayer, getGameData }
)(CreatePlayer);
