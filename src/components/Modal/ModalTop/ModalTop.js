import { useSelector } from "react-redux";

import {
  BOARD_RESULTS,
  BOARD_RESULT_MODES,
  STATUS
} from "../../../utilities/constants";
import { getBoardResult } from "../../../utilities/helpers";

function ModalTop() {
  const board = useSelector((state) => state.game.board);
  const status = useSelector((state) => state.game.status);
  const selectedMark = useSelector((state) => state.game.selectedMark);

  let topText = '';
  let boardResult = getBoardResult(board, BOARD_RESULT_MODES.TYPE).mark;
  if (status === STATUS.GAME_OVER) {  // game is over
    if (boardResult !== BOARD_RESULTS.TIE) {  // it's not a tie
      if (boardResult === selectedMark) {  // you won
          topText = 'PLAYER 1 WINS!';
      }
      else {  // you lost
          topText = 'PLAYER 2 WINS!';
      }
    } else {  // it's a tie
      return <></>
    }
  } else { // game is paused
    return <></>
  }
  return <div className="modal-content-top-text">{topText}</div>
}

export default ModalTop;