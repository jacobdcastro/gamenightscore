import styled from 'styled-components';

const LobbyWrapper = styled.div`
  min-height: 100vh;
  position: absolute;
  top: 0;
  width: 100vw;
  text-align: center;
  /* background-color: ${props => props.theme.yellow}; */

  .infoTabWrapper {
    transition: 0.5s;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .infoTab {
      text-align: left;
      background-color: ${props => props.theme.green};
      width: 80%;
      max-width: 700px;
      margin: auto;
      padding: 15px;
      height: 300px;

      img {
        height: 30px;
        width: auto;
        color: white;
        font-size: 2rem;
        float: right;
        margin: 10px;
      }

      h1 { color: white; }
    }
  }

  .createPlayerPopup {
    transition: 0.5s;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .popupContainer {
      color: white;
      padding: 10px;
      background-color: ${props => props.theme.green};
      height: 300px;
      img {
        position: absolute;
        top: 10px;
        right: 10px;
        height: 30px;
        width: auto;
      }
      div {
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin: 15px;

        input {
          margin: 4px 0;
          border: 3px solid #ef4423;
          font-weight: 600;
          letter-spacing: 1px;
          font-size: 0.8rem;
        }

        label {
          font-weight: 700;
        }

        input[type='text'] {
          padding: 10px;
          border-radius: 5px;
        }
      }
      button {
        margin: 15px;
        padding: 10px 0;
        width: 80%;
        border-radius: 5px;
        font-size: 1.2rem;
        font-weight: 600;
        color: white;
        text-decoration: none;
        text-transform: uppercase;
        border: 3px solid ${props => props.theme.yellow};
        background-color: ${props => props.theme.blue};
      }
      button:hover {
        cursor: pointer;
      }
    }
  }

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
      margin: 10px auto;
    }

    .switch {
      transition: 0.2s;
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

  @keyframes colorNotif {
    from {
      background-color: ${props => props.theme.blue};
    }

    25% {
      background-color: ${props => props.theme.yellow};
    }
    
    to {
      background-color: ${props => props.theme.green};      
    }
  }
`;

export default LobbyWrapper;
