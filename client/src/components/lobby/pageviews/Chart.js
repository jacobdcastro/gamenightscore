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

// TODO umm just finish this
//  https://uber.github.io/react-vis/documentation/series-reference/line-series

const Chart = ({ players, rounds, maxNumberOfRounds }) => {
  return (
    <Paper>
      <h1>Stats</h1>
      <XYPlot width={300} height={300}>
        <HorizontalGridLines />
        {players.map((p, index) => {
          const data = [{ x: 1, y: 10 }, { x: 6, y: 5 }, { x: 3, y: 15 }];

          return <LineSeries color="red" strokeWidth={4} data={data} />;
        })}

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
