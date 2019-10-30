import styled from 'styled-components';

const CreateGameWrapper = styled.div`
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
    }
  }
  .checkInput {
    flex-direction: column;

    input[type='checkbox'] {
      float: left;
      align-self: flex-start;
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 25px;
      width: 25px;
      z-index: 4;
    }

    .container .checkmark {
      height: 25px;
      width: 25px;
      background-color: #eee;
    }

    .container:hover input ~ .checkmark {
      background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .container input:checked ~ .checkmark {
      background-color: #ef4423;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
      content: '';
      display: none;
      margin-top: 5px;
      margin-left: 9px;
    }

    /* Show the checkmark when checked */
    .container input:checked ~ .checkmark:after {
      display: block;
    }

    /* Style the checkmark/indicator */
    .container .checkmark:after {
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
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
`;

export default CreateGameWrapper;
