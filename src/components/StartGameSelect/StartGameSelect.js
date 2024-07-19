import { useDispatch } from 'react-redux';

import { fetchTeams } from '../../slices/gameSlice';

function StartGameSelect() {
  const dispatch = useDispatch();

  return (
    <div className="start-selector">
      <button className="start-selector-btn" id="vs-player-btn"
        onClick={() => {
          dispatch(fetchTeams());
        }}>
        START GAME
      </button>
    </div>
  )
}

export default StartGameSelect;