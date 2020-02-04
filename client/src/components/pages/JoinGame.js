import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { joinGame } from '../../redux/actions/game';
import { setInitPlayerState } from '../../redux/actions/user';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import { Paper, Container, Button } from '@material-ui/core';
import JoinGameWrapper from '../../styles/pages/JoinGame.sty.js';

const JoinGame = ({
  joinGame,
  setInitPlayerState,
  gameId,
  isAuthenticated,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    password: '',
  });
  const { title, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    joinGame(formData);
  };

  if (gameId) setInitPlayerState({ gameId, isGamemaster: false });

  if (isAuthenticated) {
    return <Redirect to='/create-player' />;
  }

  return (
    <Paper>
      <Container maxWidth='md'>
        <JoinGameWrapper>
          <Link className='backLink' to='/'>
            &#8592; Back
          </Link>
          <h1 className='dutchBlitzLogo'>Dutch Blitz</h1>
          <h1>Join a live game!</h1>
          <p>
            Ask the Gamemaster (player who created the game) for the game title
            and password. Title and password are displayed in game dashboard.
          </p>
          <form id='joinGameForm' onSubmit={e => onSubmit(e)}>
            <div className='inputDiv textInput'>
              <TextField
                required
                fullWidth={true}
                variant='outlined'
                id='title'
                name='title'
                label='Title of Game'
                margin='normal'
                placeholder='Title'
                value={title}
                onChange={e => onChange(e)}
                helpertext='This is case sensitive!'
              />
            </div>
            <div className='inputDiv textInput'>
              <TextField
                required
                fullWidth={true}
                variant='outlined'
                id='password'
                name='password'
                label='Password'
                margin='normal'
                placeholder='password'
                value={password}
                onChange={e => onChange(e)}
                helpertext='This is also case sensitive!'
              />
            </div>
            <Button
              type='submit'
              className='joinGame'
              variant='contained'
              size='large'
              color='primary'
              fullWidth={true}
            >
              Join Game
            </Button>
          </form>
        </JoinGameWrapper>
      </Container>
    </Paper>
  );
};

JoinGame.propTypes = {
  joinGame: PropTypes.func.isRequired,
  setInitPlayerState: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  gameId: PropTypes.string,
};

const mapStateToProps = state => ({
  isAuthenticated: state.player.isAuthenticated,
  gameId: state.game._id,
});

export default connect(mapStateToProps, { joinGame, setInitPlayerState })(
  JoinGame
);
