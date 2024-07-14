import { useSelector } from "react-redux";

import { MARKS } from "../../utilities/constants";

import xIconActive from '../../assets/icon-x-active.svg'
import xIcon from '../../assets/icon-x-inactive.svg';
import oIconActive from '../../assets/icon-o-active.svg';
import oIcon from '../../assets/icon-o-inactive.svg';

import PlayerSelectButton from "./PlayerSelectButton/PlayerSelectButton";

function PlayerSelect() {
  const selectedMark = useSelector((state) => state.game.selectedMark);
  return (
    <div className="player-selector">
      <div className="player-selector-mark">
        PICK PLAYER 1'S MARK
      </div>
      <div className="player-selector-toggle">
        <PlayerSelectButton
          icon={xIcon}
          iconActive={xIconActive}
          mark={MARKS.X}
        />
        <PlayerSelectButton
          icon={oIcon}
          iconActive={oIconActive}
          mark={MARKS.O}
        />
      </div>
      <div className="player-selector-selectedMark">
        You have selected :
      </div>
      <div className="player-selector-selectedMarkImage">
        <img
          className={` ${selectedMark === MARKS.X ? 'xIcon selected' : 'oIcon selected'}`}
          src={selectedMark === MARKS.X ? xIcon : oIcon}
          alt="X Mark"
        />
      </div>
      <div className="player-selector-reminder">
        REMEMBER : <span className={` ${selectedMark === MARKS.X ? 'player-selector-reminder-X' : 'player-selector-reminder-O'}`}>P1</span> GOES FIRST
      </div>
    </div>
  )
}

export default PlayerSelect;