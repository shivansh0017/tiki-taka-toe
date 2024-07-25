import { useDispatch, useSelector } from 'react-redux';

import { addMarkToBoard, toggleSearchPlayer } from '../../slices/gameSlice';
import GameSquare from '../../components/Board/GameSquare/GameSquare';
import ColumnCategorySquare from './Categories/ColumnCategorySquare/ColumnCategorySquare';
import RowCategorySquare from './Categories/RowCategorySquare/RowCategorySquare';
import LogoSquare from './LogoSquare/LogoSquare';
import { MODAL_STATES, SEARCH_PLAYER, STATUS } from '../../utilities/constants';
import SearchPlayer from '../SearchPlayer/SearchPlayer';
import './Board.css';

function Board() {
  const board = useSelector((state) => state.game.board);
  const status = useSelector((state) => state.game.status);
  const rowCategories = useSelector((state) => state.game.rowCategories);
  const columnCategories = useSelector((state) => state.game.columnCategories);
  const modal = useSelector((state) => state.game.modalState);
  const searchPlayer = useSelector((state) => state.game.searchPlayer);
  const dispatch = useDispatch();

  const handleBoardClick = (event) => {
    if (status !== STATUS.PLAYER_TURN) return;  // not the player's turn
    if (event.target.className !== 'cell' && event.target.parentElement.className !== 'board') return;  // didn't click on cell
    let index = Number(event.target.getAttribute('index'));
    dispatch(addMarkToBoard(index));
  }

  const handleSearchPlayer = () => {
    dispatch(toggleSearchPlayer());
  }

  return (
    <div className='board-container'>
      <div className='logo-square'>
        <LogoSquare/>
      </div>
      <div className='column-categories'>
        <ColumnCategorySquare index={0}/>
        <ColumnCategorySquare index={1}/>
        <ColumnCategorySquare index={2}/>
      </div>
      <div className='row-categories'>
        <RowCategorySquare index={0}/>
        <RowCategorySquare index={1}/>
        <RowCategorySquare index={2}/>
      </div>
      <div className='board' onClick={(event) => handleBoardClick(event)}>
        <GameSquare cell={board[0]} index={0} key={0} />
        <GameSquare cell={board[1]} index={1} key={1} />
        <GameSquare cell={board[2]} index={2} key={2} />
        <GameSquare cell={board[3]} index={3} key={3} />
        <GameSquare cell={board[4]} index={4} key={4} />
        <GameSquare cell={board[5]} index={5} key={5} />
        <GameSquare cell={board[6]} index={6} key={6} />
        <GameSquare cell={board[7]} index={7} key={7} />
        <GameSquare cell={board[8]} index={8} key={8} />
      </div>
      {/* <div className='hello'>Hello World</div> */}
    </div>
  )
}

export default Board;