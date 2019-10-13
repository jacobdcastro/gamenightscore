import styled from 'styled-components';

const RoundsWrapper = styled.div`
  background-color: ${props => props.theme.yellow};
  padding: 25px;

  .roundListing {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.theme.blue};
    margin: 15px auto;
    color: white;
    border-radius: 15px;
    height: 65px;
    box-shadow: 0 5px 15px #444;
    text-align: left;

    .position {
      text-align: center;
      margin: 0 10px;
      h1 {
        font-size: 2rem;
        margin: 0px;
      }
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
      height: 25px;
      width: auto;
      margin-right: 25px;

      .crown {
        fill: white;
      }
    }

    .totalScore {
      text-align: center;
      width: 50px;
      margin: 10px;
      color: black;
      span {
        color: white;
      }

      h3 {
        background-color: white;
        margin: 2px;
      }
    }
  }
`;

export default RoundsWrapper;
