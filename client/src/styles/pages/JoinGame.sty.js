import styled from 'styled-components';

const JoinGameWrapper = styled.div`
  position: absolute;
  top: 0;
  min-height: 100vh;
  width: 100vw;
  background-color: ${props => props.theme.blue};
  text-align: center;
  color: white;
  /* padding: 20px 20px 50px; */

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
    margin-top: 10px;
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
  }
`;

export default JoinGameWrapper;
