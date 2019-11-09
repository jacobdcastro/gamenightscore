import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper } from '@material-ui/core';

const Rounds = ({ rounds, players }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Rd.#</TableCell>
            <TableCell align="left">Winner</TableCell>
            <TableCell align="right">Winner's Score</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rounds.map((round, index) => {
            const {
              roundNumber,
              inProgress,
              winner,
              playerScores,
              startTime,
              endTime,
            } = round;
            let winnerPlayerData;
            let winnerRoundData;
            if (winner) {
              winnerPlayerData = players.find(p => p._id === winner);
              winnerRoundData = playerScores.find(p => p.player === winner);
            }
            console.log(startTime, ' : ', endTime);
            return (
              <TableRow key={index}>
                <TableCell scope="row" align="left">
                  {roundNumber}
                </TableCell>
                <TableCell align="left">
                  <b>
                    {winner && !inProgress
                      ? `${winnerPlayerData.name}`
                      : 'No winner yet...'}
                    {!winner && inProgress && `Round currently in progress...`}
                  </b>
                </TableCell>
                <TableCell align="right">
                  <b>{winnerRoundData ? winnerRoundData.roundScore : 'TBD'}</b>
                </TableCell>
                <TableCell align="right">
                  {startTime && endTime ? (
                    // TODO fix broken duration
                    <Moment duration={startTime} date={endTime} />
                  ) : (
                    'TBD'
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

Rounds.propTypes = {
  rounds: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  rounds: state.game.rounds,
  players: state.game.players,
});

export default connect(mapStateToProps)(Rounds);
