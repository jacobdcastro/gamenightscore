import React from 'react';
import PropTypes from 'prop-types';
// import InfoIcon from '../../assets/info-icon.svg';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';

import InfoIcon from '@material-ui/icons/Info';

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
    font-size: 1.5rem;
    margin: 0;
  }

  .infoIcon {
    height: 50px;
    width: 50px;
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

const Nav = ({ currentRoundData, toggleInfoDialog }) => {
  return (
    <NavWrapper>
      <h1 className="dutchBlitzLogo">Dutch Blitz</h1>

      <h2>
        Current Round: {currentRoundData ? currentRoundData.roundNumber : '...'}
      </h2>

      {/* Add new player button */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={() => toggleInfoDialog(true)}
        className="infoIcon"
      >
        <InfoIcon />
      </IconButton>
    </NavWrapper>
  );
};

Nav.propTypes = {
  currentRoundData: PropTypes.object,
  toggleInfoDialog: PropTypes.func.isRequired,
};

export default Nav;
