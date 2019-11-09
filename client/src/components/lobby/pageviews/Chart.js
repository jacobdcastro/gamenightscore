import React from 'react';
import { connect } from 'react-redux';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
} from 'react-vis';

const Chart = props => {
  const data = [{ x: 1, y: 10 }, { x: 2, y: 5 }, { x: 3, y: 15 }];

  return (
    <div>
      <XYPlot width={300} height={300}>
        <HorizontalGridLines />
        <LineSeries color="red" data={data} />
        <XAxis title="round" />
        <YAxis title="score" />
      </XYPlot>
    </div>
  );
};

const mapStateToProps = state => ({
  players: state.game.players,
  rounds: state.game.rounds,
});

export default connect(
  mapStateToProps,
  null
)(Chart);
