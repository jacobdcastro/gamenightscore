import styled from 'styled-components';

const LandingWrapper = styled.div`
  position: absolute;
  top: 0;
  background-color: ${props => props.theme.blue};
  text-align: center;
  color: white;
  height: 100%;
  padding: 0 0px;
  width: 100vw;

  h2 {
    margin-top: 25px;
    font-size: 1.75rem;

    .dutchBlitzLogo {
      font-size: 4rem;
    }
  }

  .gameLinks {
    margin: auto;
    height: 200px;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    a {
      margin: 15px;
      padding: 10px 0;
      width: 100%;
      border-radius: 5px;
      font-size: 1.2rem;
      font-weight: 600;
      color: white;
      text-decoration: none;
      text-transform: uppercase;
      border: 3px solid ${props => props.theme.yellow};
    }
    .createGame {
      background-color: ${props => props.theme.green};
    }
    .joinGame {
      background-color: ${props => props.theme.orange};
    }
  }
`;

export default LandingWrapper;
