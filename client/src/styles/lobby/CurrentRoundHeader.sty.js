import styled from 'styled-components';

const CurrentRoundHeaderWrapper = styled.div`
  height: 70px;
  width: 100%;
  transition: 1s;
  ${props => props.updated && 'animation: notif 0.5s'}
  background-color: ${props => props.theme.blue};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 0;

  p {
    text-transform: uppercase;
    font-weight: 600;
    margin: 5px auto;
    color: white;
  }


  @keyframes notif {
    from {
      background-color: ${props => props.theme.blue};
    }
    30% {
      background-color: ${props => props.theme.yellow};
    }
    to {
      background-color: ${props => props.theme.blue};
    }
  }
`;

export default CurrentRoundHeaderWrapper;
