import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper } from '@material-ui/core';

const Standings = ({ players, hideScores }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Pos.</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Total Score</TableCell>
            {!hideScores && (
              <Fragment>
                <TableCell align="right">Worst Round Score</TableCell>
                <TableCell align="right">Best Round Score</TableCell>
              </Fragment>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, index) => {
            // get sort all scores and display lowest/highest score
            let allScores = [];
            player.roundsPlayed.forEach(r => allScores.push(r.roundScore));
            allScores.sort((a, b) => a - b);
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row" align="left">
                  {index + 1}
                </TableCell>
                <TableCell align="left">
                  <b>{player.name}</b>
                </TableCell>
                <TableCell align="right">
                  <b>{hideScores ? '???' : player.totalScore}</b>
                </TableCell>
                {!hideScores && (
                  <Fragment>
                    <TableCell align="right">{allScores[0]}</TableCell>
                    <TableCell align="right">
                      {allScores[allScores.length - 1]}
                    </TableCell>
                  </Fragment>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
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
