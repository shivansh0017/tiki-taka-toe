import { useState } from 'react';
import { useSelector } from 'react-redux';

import iconX from '../../../assets/icon-x.svg';
import iconO from '../../../assets/icon-o.svg';
import iconXOutline from '../../../assets/icon-x-outline.svg';
import iconOOutline from '../../../assets/icon-o-outline.svg';
import iconXActive from '../../../assets/icon-x-active.svg';
import iconOActive from '../../../assets/icon-o-active.svg';

const GameSquare = ({ cell, index }) => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const currentTurn = useSelector((state) => state.game.currentTurn);
  const winningLine = useSelector((state) => state.game.winningLine);


  const handleMouseEnter = (index) => {
    setHoverIndex(Number(index));
  }

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  }

  return (
    <button
      className={`cell ${index%2 === 0 ? `even` : `odd`} ${winningLine.includes(index) && `winning-line-${cell}`}`}
      index={index}
      onMouseEnter={(event) => handleMouseEnter(event.target.getAttribute('index'))}
      onMouseLeave={() => handleMouseLeave()}
      value={cell}
    >
      {hoverIndex === index && cell === ' ' ?
        <img src={currentTurn === 'X' ? iconXOutline : iconOOutline} alt="Mark" /> :
        <></>
      }
      {cell === 'X' ?
        (winningLine.includes(index) ? <img src={iconXActive} alt="X" /> : <img src={iconX} alt="X" />) :
        <></>
      }
      {cell === 'O' ?
        (winningLine.includes(index) ? <img src={iconOActive} alt="O" /> : <img src={iconO} alt="O" />) :
        <></>
      }
    </button>
  )
}

export default GameSquare;