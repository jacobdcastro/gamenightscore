import React from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
} from 'react-vis';
import 'react-vis/dist/style.css';

const Chart = ({ players, rounds, maxNumberOfRounds }) => {
  const data = [{ x: 1, y: 10 }, { x: 6, y: 5 }, { x: 3, y: 15 }];
  const data1 = [{ x: 2, y: 13 }, { x: 7, y: 2 }, { x: 3, y: 8 }];
  const data2 = [{ x: 9, y: 6 }, { x: 11, y: 4 }, { x: 6, y: 4 }];

  return (
    <Paper>
      <h1>Stats</h1>
      <XYPlot width={300} height={300}>
        <HorizontalGridLines />
        <LineSeries color="red" strokeWidth={4} data={data} />
        <LineSeries color="blue" strokeWidth={4} data={data1} />
        <LineSeries color="green" strokeWidth={4} data={data2} />
        <XAxis title="round" />
        <YAxis title="score" />
      </XYPlot>
    </Paper>
  );
};

const mapStateToProps = state => ({
  players: state.game.players,
  rounds: state.game.rounds,
  maxNumberOfRounds: state.game.maxNumberOfRounds,
});

export default connect(
  mapStateToProps,
  null
)(Chart);
