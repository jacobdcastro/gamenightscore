import React from 'react';
import PropTypes from 'prop-types';
import InfoIcon from '../../assets/info-icon.svg';
import styled from 'styled-components';

const NavWrapper = styled.nav`
  /* position: absolute; */
  /* top: 0; */
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    font-size: 2rem;
    margin: 10px 0;
  }

  h2 {
    margin: 0;
  }

  .infoIcon {
    height: 30px;
    width: auto;
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

const Nav = ({ currentRoundData, toggleInfoTab }) => {
  if (currentRoundData) console.log(currentRoundData);
  return (
    <NavWrapper>
      <h1 className="dutchBlitzLogo">Dutch Blitz</h1>

      <h2>
        Current Round: {currentRoundData ? currentRoundData.roundNumber : '...'}
      </h2>

      <img
        className="infoIcon"
        src={InfoIcon}
        alt="information to view game title and password"
        onClick={() => toggleInfoTab(true)}
      />
    </NavWrapper>
  );
};

Nav.propTypes = {
  currentRoundData: PropTypes.object,
  toggleInfoTab: PropTypes.func.isRequired,
};

export default Nav;
