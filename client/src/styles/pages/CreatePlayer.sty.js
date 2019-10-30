import styled from 'styled-components';

const CreatePlayerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  color: black;
  min-height: 100vh;
  width: 100vw;

  .backLink {
    position: absolute;
    top: 20px;
    left: 20px;
    padding: 10px 8px;
    border-radius: 8px;
    color: ${props => props.theme.orange};
    background-color: white;
    text-decoration: none;
  }

  h1 {
    margin-top: 15px;
  }

  .dutchBlitzLogo {
    font-size: 4rem;
    margin: 15px auto 8px;
  }

  form {
    max-width: 800px;
    margin: auto;
    margin-top: 10px;
    .inputDiv {
      text-align: left;
      margin: 0 15px;
      width: 100%;
    }

    .deckBtns {
      display: flex;
      flex-wrap: wrap;

      div {
        height: 95px;
        width: 95px;
        border-radius: 15px;
        background-color: white;

        img {
          height: 100%;
          width: auto;
        }
        svg {
          .blue {
            fill: ${props => props.theme.blue};
          }
          .green {
            fill: ${props => props.theme.green};
          }
          .orange {
            fill: ${props => props.theme.orange};
          }
          .yellow {
            fill: ${props => props.theme.yellow};
          }
        }
        label {
          display: none;
        }
        input {
          position: absolute;
          display: hidden;
          opacity: 0;
          height: 95px;
          width: 95px;
          background-color: ${props => props.theme.orange};
        }
        input:hover {
          cursor: pointer;
        }
      }
    }

    button {
      margin: 15px;
      padding: 10px 0;
      width: 80%;
    }
    button:hover {
      cursor: pointer;
    }
  }
`;

export default CreatePlayerWrapper;
