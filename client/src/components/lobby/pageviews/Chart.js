import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries
} from "react-vis";
import "react-vis/dist/style.css";

// TODO umm just finish this
//  https://uber.github.io/react-vis/documentation/series-reference/line-series

const lineColors = [
  "red",
  "blue",
  "yellow",
  "#800080", // purple
  "green",
  "#add8e6", // lightblue
  "black",
  "#ffc0cb" // pink
];

const Chart = ({ players, rounds, maxNumberOfRounds }) => {
  players.sort((a, b) => a._id - b._id); // sort by id to prevent reordering
  const [playerScores, setPlayerScores] = useState({
    players: [],
    scores: []
  });

  useEffect(() => {
    console.log("Chart updated");
  }, [players]);

  return (
    <Paper>
      <h1>Stats</h1>
      <XYPlot width={300} height={300}>
        <HorizontalGridLines />
        {players.map((p, index) => {
          let data = [{ x: 0, y: 0 }]; // set 'round 0'
          p.roundsPlayed.forEach(r =>
            data.push({ x: r.roundNumber, y: r.roundScore })
          );
          return (
            <LineSeries
              key={p._id}
              color={lineColors[index]}
              strokeWidth={4}
              data={data}
            />
          );
        })}

        <XAxis title="round" position="middle" />
        <YAxis title="score" position="middle" />
      </XYPlot>

      <div></div>
    </Paper>
  );
};

const mapStateToProps = state => ({
  players: state.game.players,
  rounds: state.game.rounds,
  currentRound: state.game.currentRound,
  maxNumberOfRounds: state.game.maxNumberOfRounds
});

export default connect(mapStateToProps, null)(Chart);
