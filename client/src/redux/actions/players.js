import axios from 'axios';
import { dispatch } from '../store';
import {
  GET_ALL_PLAYERS_SUCCESS,
  GET_ALL_PLAYERS_FAIL,
  GM_CREATE_PLAYER_SUCCESS,
  GM_CREATE_PLAYER_FAIL,
  GM_SUBMIT_USER_SCORE_SUCCESS,
  GM_SUBMIT_USER_SCORE_FAIL,
} from '../types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getAllPlayers = async () => {
  let players;
  try {
    dispatch({
      type: GET_ALL_PLAYERS_SUCCESS,
      payload: [players],
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PLAYERS_FAIL,
      payload: error,
    });
  }
};

export const gmCreatePlayer = async formData => {
  const { isGamemaster, gameId, name, gmCreated, deck } = formData;

  const body = JSON.stringify({
    isGamemaster,
    gameId,
    name,
    gmCreated,
    deck,
  });

  try {
    const res = await axios.post(
      `/api/games/${gameId}/newPlayer`,
      body,
      config
    );

    dispatch({
      type: GM_CREATE_PLAYER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GM_CREATE_PLAYER_FAIL,
      payload: error,
    });
  }
};
