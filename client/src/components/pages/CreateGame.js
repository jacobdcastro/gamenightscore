import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createGame } from '../../redux/actions/game';
import { setInitPlayerState } from '../../redux/actions/player';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import CreateGameWrapper from '../../styles/pages/CreateGame.sty';
import {
  Paper,
  Container,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Button,
} from '@material-ui/core';

const CreateGame = ({
  createGame,
  setInitPlayerState,
  gameId,
  isAuthenticated,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    password: '',
    maxNumberOfRounds: 1,
    hideScores: false,
  });
  const { title, password, maxNumberOfRounds, hideScores } = formData;

  const onChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const res = createGame(formData);
    console.log(res);
  };

  if (gameId) setInitPlayerState({ gameId, isGamemaster: true });

  if (isAuthenticated) return <Redirect to='/create-player' />;

  return (
    <Paper>
      <Container maxWidth='md'>
        <CreateGameWrapper>
          <Link className='backLink' to='/'>
            &#8592; Back
          </Link>
          <h1 className='dutchBlitzLogo'>Dutch Blitz</h1>
          <h1>Create a new game!</h1>
          <p>
            Once you create this game, it will be live on the server for players
            to join in!
          </p>
          <p>
            Other people will need the game title and password to join. Make it
            easy, memorable, and sharable.
          </p>

          <form id='createGameForm' onSubmit={(e) => onSubmit(e)}>
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
                onChange={(e) => onChange(e)}
                helpertext='Can be anything, to be honest. Your friends need it to login.'
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
                onChange={(e) => onChange(e)}
                helpertext='Do not use a password you use on other accounts. It will displayed on game dashboard for others to see.'
              />
            </div>
            <div className='inputDiv numInput'>
              <TextField
                required
                fullWidth={true}
                variant='outlined'
                id='maxNumberOfRounds'
                name='maxNumberOfRounds'
                label='How many rounds?'
                margin='normal'
                value={maxNumberOfRounds}
                onChange={(e) => onChange(e)}
                helpertext='Game will automatically end after this many rounds.'
              />
            </div>
            {/* <div className='inputDiv checkInput'>
              <div className='container'>
                <FormControlLabel
                  control={
                    <Checkbox
                      name='hideScores'
                      checked={hideScores}
                      onChange={e => onChange(e)}
                      value={hideScores}
                      color='primary'
                    />
                  }
                  helpertext='If checked, scores will be hidden from players until end of game.'
                  label='Hide Scores?'
                />
                <FormHelperText>
                  If checked, scores will be hidden from players until end of
                  game.
                </FormHelperText>
              </div>
            </div> */}
            <Button
              type='submit'
              className='joinGame'
              variant='contained'
              size='large'
              color='secondary'
              fullWidth={true}
            >
              Create Game
            </Button>
          </form>
        </CreateGameWrapper>
      </Container>
    </Paper>
  );
};

CreateGame.propTypes = {
  createGame: PropTypes.func.isRequired,
  setInitPlayerState: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  gameId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.player.isAuthenticated,
  gameId: state.game._id,
});

export default connect(mapStateToProps, { createGame, setInitPlayerState })(
  CreateGame
);
