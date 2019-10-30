import styled from 'styled-components';

const JoinGameWrapper = styled.div`
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

  p {
    margin: auto;
    max-width: 600px;
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

      label {
        font-weight: 700;
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

export default JoinGameWrapper;
