import styled from 'styled-components';

const LobbyWrapper = styled.div`
  min-height: 100vh;
  position: absolute;
  top: 0;
  width: 100vw;
  text-align: center;
  /* background-color: ${props => props.theme.yellow}; */

  .pageViewMenu {
    padding: 0;
    margin: 10px 0 0;
    width: 100%;
    background-color: ${props => props.theme.blue};
    text-align: center;
    display: flex;
    flex-direction: row;
    /* justify-content: space-around; */

    h2 {
      color: white;
      width: 50vw;
    }

    .switch {
      animation: 0.3s;
    }

    .selected {
      border-bottom: 7px solid ${props => props.theme.orange};
      border-top: 7px solid ${props => props.theme.orange};
    }
    .notSelected:hover {
      cursor: pointer;
    }
    .notSelected {
      border-bottom: 7px solid ${props => props.theme.blue};
      border-top: 7px solid ${props => props.theme.blue};
    }
  }

  #submitScore {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 300px;
    background-color: ${props => props.theme.orange};
  }
`;

export default LobbyWrapper;
