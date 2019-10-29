import styled from 'styled-components';

const GamemasterFooterWrapper = styled.div`
  transition: 0.8s;
  position: absolute;
  bottom: 0;
  /* height: ${props => (props.newRoundReady ? '300px' : '130px')}; */
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

  .endGameBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 8px;
    background-color: ${props => props.theme.orange};
    border: none;
    border-radius: 8px;
  }
  .disabled {
    background-color: darken(${props => props.theme.orange}, 80);
  }
`;

export default GamemasterFooterWrapper;
