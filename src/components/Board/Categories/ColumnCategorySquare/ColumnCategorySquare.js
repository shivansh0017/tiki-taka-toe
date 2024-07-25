import { useSelector } from 'react-redux';

import { TEAMS } from '../../../../utilities/constants';


const ColumnCategorySquare = ({ index }) => {
  const currentCategories = useSelector((state) => state.game.columnCategories);
  const team = currentCategories[index]
  const svgSource = TEAMS[team]
  return (
    <>
      <img className='column-category-square-image' src={svgSource} index={index}></img>
      <h1 className='column-category-square-heading'>{currentCategories[index]}</h1>
    </>
  )
}

export default ColumnCategorySquare;