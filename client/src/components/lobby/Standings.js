import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import PlayerListing from './PlayerListing';
import StandingsWrapper from '../../styles/lobby/Standings.sty.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Standings = ({ players, hideScores }) => {
  return (
    <StandingsWrapper id="standings">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Total Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" align="left">
                {index + 1}
              </TableCell>
              <TableCell align="left">{player.name}</TableCell>
              <TableCell align="right">
                {hideScores ? '???' : player.totalScore}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StandingsWrapper>
  );
};

Standings.propTypes = {
  players: PropTypes.array.isRequired,
  hideScores: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  players: state.game.players,
  hideScores: state.game.hideScores,
});

export default connect(mapStateToProps)(Standings);
