// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { submitPlayerScore } from '../../redux/actions/player';

// const SubmitScore = ({ roundNumber, submitPlayerScore }) => {
//   const [roundScore, setRoundScore] = useState(0);

//   return (
//     <div>
//       <form>
//         <label>Submit score for round {roundNumber}</label>
//       </form>
//     </div>
//   );
// };

// SubmitScore.propTypes = {
//   submitPlayerScore: PropTypes.func.isRequired,
// };

// const mapStateToProps = state => {
//   roundNumber: state.currentRound.roundNumber;
// };

// export default connect(
//   null,
//   { submitPlayerScore }
// )(SubmitScore);
