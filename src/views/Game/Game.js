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