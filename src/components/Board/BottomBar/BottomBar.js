import { useSelector } from 'react-redux';

import { MARKS, OPPONENTS } from '../../../utilities/constants';

import './BottomBar.css';

function BottomBar() {
  const selectedMark = useSelector((state) => state.game.selectedMark);
  const opponent = useSelector((state) => state.game.opponent);
  const winsX = useSelector((state) => state.game.winsX);
  const winsO = useSelector((state) => state.game.winsO);
  const ties = useSelector((state) => state.game.ties);

  const scoreText = () => {
    let textX = '';
    let textO = '';
    
    if (selectedMark === MARKS.X) {  // you chose X
      if (opponent === OPPONENTS.HUMAN) {  // you chose X -> against a human
        textX = 'P1';
        textO = 'P2';
      } else {  // you chose X -> against the CPU
        textX = 'YOU';
        textO = 'CPU';
      }
    } else {  // you chose O
      if (opponent === OPPONENTS.HUMAN) {  // you chose O -> against a human
        textX = 'P2';
        textO = 'P1';
      } else {  // you chose O -> against the CPU
        textX = 'CPU';
        textO = 'YOU';
      }
    }

    return { textX, textO }
  };

  return (
    <div className="bottom-bar">
      <div className="score left">
        <div>X ({scoreText().textX})</div>
        <div className="score-amount">{winsX}</div>
      </div>
      <div className="score center">
        <div>TIES</div>
        <div className="score-amount">{ties}</div>
      </div>
      <div className="score right">
        <div>O ({scoreText().textO})</div>
        <div className="score-amount">{winsO}</div>
      </div>
    </div>
  );
}

export default BottomBar;