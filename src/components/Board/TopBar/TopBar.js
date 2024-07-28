import { useDispatch, useSelector } from 'react-redux';

import { togglePause, toggleSearchPlayer, toggleSettings, toggleSkipTurn } from '../../../slices/gameSlice';

import { MARKS } from '../../../utilities/constants';

import IconRestart from '../../../assets/icon-restart.svg';
import IconPause from '../../../assets/icon-pause.svg';
import IconTurnO from '../../../assets/icon-o-inactive.svg';
import IconTurnX from '../../../assets/icon-x-inactive.svg';

import './TopBar.css';

function TopBar() {
  const currentTurn = useSelector((state) => state.game.currentTurn);
  const dispatch = useDispatch();

  const handleSettings = () => {
    dispatch(toggleSettings());
    dispatch(toggleSearchPlayer());
  }
  
  const handleRestart = () => {
    dispatch(togglePause());
    dispatch(toggleSearchPlayer());
  }

  const handleSkip = () => {
    dispatch(toggleSkipTurn())
  }

  return (
    <div className="top-bar">
      <div className="pause">
      <button className="pause-btn" onClick={handleSettings}>
          <img src={IconPause} alt="Restart" />
        </button>
      </div>
      <div className="turn-indicator" onClick={handleSkip}>
        <img
          src={currentTurn === MARKS.X ? IconTurnX : IconTurnO}
          alt={`Current player: ${currentTurn}`}
        />
        TURN
      </div>
      <div className="restart">
        <button className="restart-btn" onClick={handleRestart}>
          <img src={IconRestart} alt="Restart" />
        </button>
      </div>
    </div>
  )
}

export default TopBar;