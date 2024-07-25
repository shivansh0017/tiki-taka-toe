import { useSelector } from 'react-redux';

import { TEAMS } from '../../../../utilities/constants';


const ColumnCategorySquare = ({ index }) => {
  const currentCategories = useSelector((state) => state.game.columnCategories);
  const team = currentCategories[index]
  const svgSource = TEAMS[team]
  return (
    <div className='column-category-tile'>
      <img className='column-category-square-image' src={svgSource} index={index}></img>
      <h1 className='column-category-square-heading'>{currentCategories[index]}</h1>
    </div>
  )
}

export default ColumnCategorySquare;