// import { useDispatch } from 'react-redux';

// import { selectOpponent, setRandomCategories } from '../../slices/gameSlice';

// function StartGameSelect() {
//   const dispatch = useDispatch();

//   return (
//     <div className="opponent-selector"
//       onClick={(event) => dispatch(selectOpponent(event.target.value))}>
//       <button className="opponent-selector-btn" id="vs-player-btn" value="HUMAN" onClick={() => dispatch(setRandomCategories())}>
//         START GAME
//       </button>
//     </div>
//   )
// }

// export default StartGameSelect;

import { useDispatch } from 'react-redux';

import { selectOpponent, setRandomCategories } from '../../slices/gameSlice';

function StartGameSelect() {
  const dispatch = useDispatch();

  return (
    <div className="opponent-selector"
      onClick={(event) => {
        setTimeout(() => {
          dispatch(selectOpponent(event.target.value));
        }, 1000); // Add a delay of 1 seconds
      }}>
      <button className="opponent-selector-btn" id="vs-player-btn" value="HUMAN" onClick={() => dispatch(setRandomCategories())}>
        START GAME
      </button>
    </div>
  )
}

export default StartGameSelect;