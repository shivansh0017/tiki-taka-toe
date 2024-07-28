import { useDispatch, useSelector } from 'react-redux';

import { addMarkToBoard, toggleSearchPlayer } from '../../slices/gameSlice';
import GameSquare from '../../components/Board/GameSquare/GameSquare';
import ColumnCategorySquare from './Categories/ColumnCategorySquare/ColumnCategorySquare';
import RowCategorySquare from './Categories/RowCategorySquare/RowCategorySquare';
import LogoSquare from './LogoSquare/LogoSquare';
import SearchPlayer from './SearchPlayer/SearchPlayer';
import { MODAL_STATES, SEARCH_PLAYER, STATUS } from '../../utilities/constants';
import './Board.css';

function Board() {
  const board = useSelector((state) => state.game.board);
  const status = useSelector((state) => state.game.status);
  const rowCategories = useSelector((state) => state.game.rowCategories);
  const columnCategories = useSelector((state) => state.game.columnCategories);
  const modal = useSelector((state) => state.game.modalState);
  const searchPlayer = useSelector((state) => state.game.searchPlayer);
  const dispatch = useDispatch();

  const handleSearchPlayer = (index) => {
    if(board[index] !== ' ') return;
    dispatch(toggleSearchPlayer(index));
  }

  return (
    <div className='board-container'>
      <div className='logo-square'>
        <LogoSquare />
      </div>
      <div className='column-categories'>
        <ColumnCategorySquare index={0} />
        <ColumnCategorySquare index={1} />
        <ColumnCategorySquare index={2} />
      </div>
      <div className='row-categories'>
        <RowCategorySquare index={0} />
        <RowCategorySquare index={1} />
        <RowCategorySquare index={2} />
      </div>
      {/* <div className='board' onClick={(event) => handleBoardClick(event)}> */}
      <div className='board'>
        {board.map((cell, index) => (
          <div className={`${index}`} onClick={() => handleSearchPlayer(index)}>
            <GameSquare cell={cell} index={index} />
          </div>
        ))}
      </div>
      {searchPlayer === SEARCH_PLAYER.YES && <SearchPlayer />}
    </div>
  )
}

export default Board;