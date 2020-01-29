import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';

import Transition from './Transition';
import InfoTab from './InfoTab';
import NewPlayerPopup from '../lobby/gamemaster/NewPlayerPopup';
import EndGamePopup from '../lobby/gamemaster/EndGamePopup';
import PlayerSubmitScore from '../lobby/PlayerSubmitScore';

import {
  toggleInfoPopup,
  toggleNewPlayerPopup,
  toggleEndGamePopup,
  togglePlayerSubmitScorePopup,
} from '../../redux/actions/popups';

const Dialogs = ({
  infoDialogIsOpen,
  toggleInfoPopup,
  newPlayerPopupIsOpen,
  toggleNewPlayerPopup,
  endGamePopupIsOpen,
  toggleEndGamePopup,
  isGamemaster,
  isExpired,
  currentRoundData,
  currentRoundIsScored,
}) => {
  return (
    <>
      {/* info popup */}
      <Dialog
        open={infoDialogIsOpen}
        TransitionComponent={Transition}
        keepMounted
        onBackdropClick={() => toggleInfoPopup(false)}
        aria-labelledby='game information popup'
        aria-describedby='information about game such as game name and password, number of players'
        className='infoDialog'
      >
        <InfoTab toggleInfoPopup={toggleInfoPopup} />
      </Dialog>

      {/* add new player popup */}
      {isGamemaster && !isExpired && (
        <Dialog
          open={newPlayerPopupIsOpen}
          TransitionComponent={Transition}
          keepMounted
          onBackdropClick={() => toggleNewPlayerPopup(false)}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
          className='newPlayerPopup'
        >
          <NewPlayerPopup toggleNewPlayerPopup={toggleNewPlayerPopup} />
        </Dialog>
      )}

      {/* end game popup */}
      {isGamemaster && !isExpired && (
        <Dialog
          open={endGamePopupIsOpen}
          TransitionComponent={Transition}
          keepMounted
          onBackdropClick={() => toggleEndGamePopup(false)}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
          className='endGamePopup'
        >
          <EndGamePopup toggleEndGamePopup={toggleEndGamePopup} />
        </Dialog>
      )}

      {!isExpired && !isGamemaster && (
        <Dialog
          open={currentRoundData.finished && !currentRoundIsScored}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby='Submit your score'
          aria-describedby='score submission for current round'
        >
          <PlayerSubmitScore
            currentRoundIsScored={currentRoundIsScored}
            roundData={currentRoundData}
          />
        </Dialog>
      )}
    </>
  );
};

Dialogs.propTypes = {
  isGamemaster: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  infoDialogIsOpen: state.popups.infoDialogIsOpen,
  newPlayerPopupIsOpen: state.popups.newPlayerPopupIsOpen,
  endGamePopupIsOpen: state.popups.endGamePopupIsOpen,
  isGamemaster: state.player.isGamemaster,
  isExpired: state.game.expired,
});

export default connect(mapStateToProps, {
  toggleInfoPopup,
  toggleNewPlayerPopup,
  toggleEndGamePopup,
  togglePlayerSubmitScorePopup,
})(Dialogs);
