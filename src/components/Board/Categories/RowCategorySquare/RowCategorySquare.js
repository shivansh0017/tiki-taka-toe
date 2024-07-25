import { useSelector } from 'react-redux';

import { TEAMS } from '../../../../utilities/constants';


const RowCategorySquare = ({ index }) => {
  const currentCategories = useSelector((state) => state.game.rowCategories);
  const team = currentCategories[index]
  const svgSource = TEAMS[team]
  return (
    <>
      <img className='row-category-square-image' src={svgSource} index={index}></img>
      <h1 className='row-category-square-heading'>{currentCategories[index]}</h1>
    </>
  )
}

export default RowCategorySquare;