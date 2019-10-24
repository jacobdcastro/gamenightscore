import styled from 'styled-components';

const GamemasterFooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  height: 130px;
  width: 100%;
  background-color: #444444;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  box-shadow: 0 0px 25px #888;

  .rndBtn {
    height: 100px;
    width: 100px;
    border: none;
    border-radius: 100%;
    box-shadow: 0 0 8px #888;
  }

  .startBtn {
    color: white;
    background-color: ${props => props.theme.green};
  }
  .endBtn {
    color: black;
    background-color: ${props => props.theme.yellow};
  }

  .addPlayerBtn {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 8px;
    background-color: ${props => props.theme.yellow};
    border: none;
    border-radius: 8px;
  }

  .createPlayerPopup {
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100vw;

    .popupContainer {
      padding: 10px;
      background-color: ${props => props.theme.green};
      img {
        position: absolute;
        top: 10px;
        right: 10px;
      }
      form {
      }
    }
  }
`;

export default GamemasterFooterWrapper;
