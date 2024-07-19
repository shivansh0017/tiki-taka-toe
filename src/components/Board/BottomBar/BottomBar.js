import { useSelector } from 'react-redux';

import { MARKS } from '../../../utilities/constants';

import './BottomBar.css';

function BottomBar() {
  const selectedMark = useSelector((state) => state.game.selectedMark);
  const winsX = useSelector((state) => state.game.winsX);
  const winsO = useSelector((state) => state.game.winsO);
  const ties = useSelector((state) => state.game.ties);

  const scoreText = () => {
    let textX = '';
    let textO = '';

    if (selectedMark === MARKS.X) {
      textX = 'P1';
      textO = 'P2';
    } else {
      textX = 'P2';
      textO = 'P1';
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