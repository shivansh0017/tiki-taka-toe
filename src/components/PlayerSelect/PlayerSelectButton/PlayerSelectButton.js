import { useDispatch, useSelector } from "react-redux";

import { toggleSelectedMark } from '../../../slices/gameSlice';

function PlayerSelectButton({ icon, iconActive, mark }) {
  const dispatch = useDispatch();

  const selectedMark = useSelector((state) => state.game.selectedMark); // the initial state of mark is X
    return (
        <button
            className={`player-selector-button ${selectedMark === mark ? 'active' : ''}`} // if selected mark is equal to X, add 'active' class 
            id={`btn-${mark}`}
            onClick={(event) => dispatch(toggleSelectedMark(event.currentTarget.value))}
            value={mark}>
            <img
                className="player-selector-icon"
                src={selectedMark === mark ? iconActive : icon}
                alt={`${mark} icon`} />
        </button>
    )
}

export default PlayerSelectButton;