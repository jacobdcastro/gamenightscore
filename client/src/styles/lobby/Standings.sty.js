import styled from 'styled-components';

const StandingsWrapper = styled.div`
  background-color: ${props => props.theme.yellow};
  padding: 25px;

  .playerListing {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.theme.blue};
    margin: 15px auto;
    color: white;
    border-radius: 15px;
    box-shadow: 0 5px 15px #444;

    .totalScore {
      width: 35px;
      background-color: white;
      margin: 10px;
      color: black;
    }

    .connected {
      height: 25px;
      width: 25px;
      border-radius: 100%;
      margin-right: 10px;
    }
    .is {
      background-color: ${props => props.theme.green};
    }
    .isNot {
      background-color: ${props => props.theme.red};
    }

    .playerName {
      flex-grow: 3;
    }

    .gamemasterIcon {
      height: 45px;
      width: auto;
      margin-right: 25px;
    }
  }
`;

export default StandingsWrapper;
