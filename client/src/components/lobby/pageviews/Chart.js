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

// TODO fix height issue on mobile

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

const Chart = ({ players, currentRound }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  players.sort((a, b) => a._id - b._id); // sort by id to prevent reordering

  useEffect(() => {
    window.addEventListener("resize", () => {
      const w = window.innerWidth;
      setWindowWidth(w);
    });
  }, [players]);

  return (
    <Paper style={{ textAlign: "center" }}>
      <h1>Stats</h1>
      <XYPlot width={windowWidth - 80} height={400}>
        <HorizontalGridLines />
        {players.map((p, index) => {
          let data = [{ x: 0, y: 0 }]; // set 'round 0'
          p.roundsPlayed.forEach(r =>
            data.push({ x: r.roundNumber, y: r.totalScoreToRound })
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

        <XAxis title="round" position="middle" tickTotal={currentRound} />
        <YAxis title="score" position="middle" />
      </XYPlot>

      <div
        className="chartLegend"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly"
        }}
      >
        {players.map((p, index) => {
          return (
            <div
              className="playerLabel"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div
                className="color"
                style={{
                  height: "20px",
                  width: "40px",
                  backgroundColor: lineColors[index],
                  marginRight: "5px"
                }}
              />
              <span className="label"> {p.name}</span>
            </div>
          );
        })}
      </div>
    </Paper>
  );
};

const mapStateToProps = state => ({
  players: state.game.players
});

export default connect(mapStateToProps, null)(Chart);
