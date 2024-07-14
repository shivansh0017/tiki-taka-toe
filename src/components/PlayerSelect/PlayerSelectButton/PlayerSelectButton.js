import { useDispatch, useSelector } from "react-redux";

import { toggleSelectedMark } from '../../../slices/gameSlice';

// This function gets a 'value' mark that tells whether the selected button in PlayerSelect.js is X or O. This value is sent to PlayerSelectButton.js. The selectedMark is used to determine the initial state of the Mark property. If the selectedMark is same as the value received from the PlayerSelect.js, then the iconActive is displayed. Otherwise, the normal icon is displayed. So for eg. the button selected is X and the selectedMark is X, then the iconActive is displayed. The button selected is O and the selectedMark is O, then the iconActive is displayed. If the selectedMark and mark passed are different, the state is updated using the dispatch function, and the appropriate mark is set. The active icon is then re rendered and displayed.

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