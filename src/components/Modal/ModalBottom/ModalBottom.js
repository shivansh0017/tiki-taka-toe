import { useSelector } from 'react-redux';

import {
  BOARD_RESULTS,
  BOARD_RESULT_MODES,
  MODAL_STATES,
  STATUS
} from '../../../utilities/constants';
import { getBoardResult } from "../../../utilities/helpers";

import iconO from '../../../assets/icon-o.svg';
import iconX from '../../../assets/icon-x.svg';

function ModalBottom() {
  const board = useSelector((state) => state.game.board);
  const modalState = useSelector((state) => state.game.modalState);
  const status = useSelector((state) => state.game.status);

  if (status === STATUS.GAME_OVER) {  // game is over
    switch (getBoardResult(board, BOARD_RESULT_MODES.TYPE).mark) {
      case BOARD_RESULTS.X: {  // X won
        return (
          <div className="modal-content-bottom-text">
            <img src={iconX} alt='X icon' />
            <span className="x-win">TAKES THE ROUND</span>
          </div>
        );
      }
      case BOARD_RESULTS.O: {  // O won
        return (
          <div className="modal-content-bottom-text">
            <img src={iconO} alt='O icon' />
            <span className="o-win">TAKES THE ROUND</span>
          </div>
        )
      }
      case BOARD_RESULTS.TIE: {  // tie
        return (
          <div className="modal-content-bottom-text">
            ROUND TIED
          </div>
        )
      }
      default: {
        return <></>
      }
    }
  }
  if (modalState === MODAL_STATES.INSTRUCTIONS) {
    return <div className="modal-content-bottom-text instructions">
      <h3 className='modal-content-heading'>INSTRUCTIONS</h3>
      <p className='modal-content-paragraph'>Tiki-Taka-Toe is a game of tic tac toe for football fans. Play on the same device against a friend and challenge your football trivia! A 3 x 3 square grid is lined up with teams criteria.
        Place your marker, an X or O, in one of the squares if you can name a football player that matches the criteria across the top row and left hand side.
        The first to get three in a row, vertically, horizontally or diagonally, is the winner.</p>
    </div>
  }
  if (modalState === MODAL_STATES.PAUSED) {  // game is paused
    return <div className="modal-content-bottom-text">RESTART GAME?</div>
  }
  if (modalState === MODAL_STATES.SKIP) {  // player want to skip turn
    return <div className="modal-content-bottom-text">SKIP TURN?</div>
  }
  return <></>
}

export default ModalBottom;