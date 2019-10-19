import styled from 'styled-components';

const GamemasterFooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  height: 130px;
  width: 100%;
  background-color: ${props => props.theme.orange};
  display: flex;
  justify-content: center;
  align-items: center;

  .startBtn {
    height: 100px;
    width: 100px;
    background-color: ${props => props.theme.green};
    color: white;
    border: none;
    border-radius: 100%;
  }
`;

export default GamemasterFooterWrapper;
