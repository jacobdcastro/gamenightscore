import styled from 'styled-components';

const CreateGameWrapper = styled.div`
  position: absolute;
  top: 0;
  background-color: ${props => props.theme.blue};
  text-align: center;
  color: white;
  min-height: 100vh;
  /* height: 100%; */
  padding: 20px 20px 50px;

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

      input[type='number'] {
        padding: 10px;
        border-radius: 5px;
      }
    }
    .checkInput {
      flex-direction: column;

      div {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

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

      label {
        margin-left: 12px;
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
      border: 3px solid #faed24;
      background-color: #168f45;
    }
    button:hover {
      cursor: pointer;
    }
  }
`;

export default CreateGameWrapper;
