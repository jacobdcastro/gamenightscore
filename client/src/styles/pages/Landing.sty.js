import styled from 'styled-components';

const LandingWrapper = styled.div`
  position: absolute;
  top: 0;
  /* background-color: ${props => props.theme.blue}; */
  text-align: center;
  color: black;
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
      width: 100%;
      
    }
    .createGame {
      background-color: ${props => props.theme.blue};
    }
    .joinGame {
      color: white;
      background-color: ${props => props.theme.green};
    }
  }
`;

export default LandingWrapper;
