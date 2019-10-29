import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import RoundListing from './RoundListing';
import RoundsWrapper from '../../styles/lobby/Rounds.sty.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Rounds = ({ rounds, players }) => {
  return (
    <RoundsWrapper id="rounds">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Round #</TableCell>
            <TableCell>Winner</TableCell>
            <TableCell>Winner's Score</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
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

          return (
            <TableRow key={index}>
              <TableCell component="th" scope="row" align="left">
                {roundNumber}
              </TableCell>
              <TableCell>
                {winner && !inProgress
                  ? `${winnerPlayerData.name}`
                  : 'No winner yet...'}
                {!winner && inProgress && `Round currently in progress...`}
              </TableCell>
              <TableCell>
                {winnerRoundData ? winnerRoundData.roundScore : 'TBD'}
              </TableCell>
              <TableCell>
                {startTime && endTime ? (
                  <Moment duration={startTime} date={endTime} />
                ) : (
                  'TBD'
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </Table>
    </RoundsWrapper>
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
