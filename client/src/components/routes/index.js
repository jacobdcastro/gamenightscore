import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute';
import Landing from '../pages/Landing';
import CreateGame from '../pages/CreateGame';
import JoinGame from '../pages/JoinGame';
import CreatePlayer from '../pages/CreatePlayer';
import Lobby from '../pages/Lobby';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AppRoutes = ({ currentGameId }) => {
  return (
    <Switch>
      <Route exact path="/create-game" component={CreateGame} />
      <Route exact path="/join-game" component={JoinGame} />
      <Route exact path="/create-player" component={CreatePlayer} />
      <Route exact path="/lobby" component={Lobby} />
      <Route exact path="/" component={Landing} />
    </Switch>
  );
};

AppRoutes.propTypes = {
  currentGameId: PropTypes.string,
};

const mapStateToProps = state => ({
  currentGameId: state.game._id,
});

export default connect(mapStateToProps)(AppRoutes);
