import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPlayer } from '../../../redux/actions/user';
import {
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core';

const NewPlayerPopup = ({ toggleNewPlayerPopup, createPlayer }) => {
  const [formData, setFormData] = useState({
    isGamemaster: false,
    gameId: localStorage.gameId,
    name: '',
    gmCreated: true,
    deck: '',
  });

  const { name } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    createPlayer(formData);
    toggleNewPlayerPopup(false);
  };

  return (
    <Fragment>
      <DialogTitle>Create New Player</DialogTitle>
      <DialogContent>
        <TextField
          id='name'
          type='text'
          label='Username'
          name='name'
          placeholder='Username'
          value={name}
          onChange={e => onChange(e)}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button
          size='medium'
          color='primary'
          onClick={() => toggleNewPlayerPopup(false)}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          size='medium'
          color='secondary'
          onClick={e => onSubmit(e)}
        >
          Add New Player
        </Button>
      </DialogActions>
    </Fragment>
  );
};

NewPlayerPopup.propTypes = {
  toggleNewPlayerPopup: PropTypes.func.isRequired,
  createPlayer: PropTypes.func.isRequired,
};

export default connect(null, { createPlayer })(NewPlayerPopup);
