import styled from 'styled-components';

const ScoreFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;

  .editBtns {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content: space-between;

    button {
      margin: 2px;
      height: 42px;
      padding: 10px;
      border-radius: 5px;
      border: none;
      width: 80px;
      color: white;
      font-weight: 600;
      font-size: 1.1rem;
      letter-spacing: 2px;
    }

    button:active {
      height: 40px;
      margin-top: 4px;
    }
  }

  .subBtns {
    button {
      background-color: ${props => props.theme.orange};
      border-bottom: 4px solid #a4240b;
    }
    button:active {
      border-bottom: 2px solid #a4240b;
    }
  }
  .addBtns {
    button {
      background-color: ${props => props.theme.green};
      border-bottom: 4px solid #0e5b2c;
    }
    button:active {
      border-bottom: 2px solid #0e5b2c;
    }
  }

  .number {
    color: white;
    padding: 20px 0 25px;
    height: 100px;
    width: 170px;
    text-align: center;
    border-radius: 15px;
    margin: 0 15px 5px;
    font-size: 5rem;
    font-weight: 600;
  }
`;

export default ScoreFormWrapper;
