import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addMarkToBoard, setFirstTurn} from '../../slices/gameSlice';
import Board from '../../components/Board/Board';
import BottomBar from '../../components/Board/BottomBar/BottomBar';
import Modal from '../../components/Modal/Modal';
import TopBar from '../../components/Board/TopBar/TopBar';


import { MARKS, MODAL_STATES, STATUS } from '../../utilities/constants';

import './Game.css';

function Game() {
  const board = useSelector((state) => state.game.board);
  const modalState = useSelector((state) => state.game.modalState);
  const selectedMark = useSelector((state) => state.game.selectedMark);
  const status = useSelector((state) => state.game.status);
  const dispatch = useDispatch();

  /*
  This `useEffect` hook is used to handle the game logic. 
  It listens for changes in the `status` state variable.

  When the `status` is `STATUS.INITIAL_GAME_LOAD`, it dispatches the `setFirstTurn` action.
  This action sets the first player's turn (X) and initializes the game state.

  When the `status` is `STATUS.CPU_TURN`, the CPU player's turn is triggered.
  The CPU player's mark is determined based on the current player's mark.
  The `moveWithDifficulty` function is called to determine the CPU's next move based on the current board state and difficulty level.
  The `addMarkToBoard` action is then dispatched to update the board state with the CPU's move.

  The `useEffect` hook has dependencies on `board`, `difficulty`, `dispatch`, `selectedMark`, and `status`.
  This means that the effect will re-run whenever any of these values change.
  */
  useEffect(() => {
    switch (status) {
      case STATUS.INITIAL_GAME_LOAD: {
        dispatch(setFirstTurn());
        // console.log(playerData);
        break;
      }
      case STATUS.PLAYER_TURN: {
        let oppositeMark = selectedMark === MARKS.X ? MARKS.O : MARKS.X;
        dispatch(addMarkToBoard({ selectedMark, oppositeMark }));
        break;
      }
      default: {
        break;
      }
    }
  }, [board, dispatch, selectedMark, status]);

  return (
    <div className="game">
      {
        (modalState !== MODAL_STATES.NONE) ?
          <Modal /> :
          <></>
      }
      <TopBar />
      <Board />
      <BottomBar />
    </div>
  );
}

export default Game;