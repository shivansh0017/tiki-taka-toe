import { useSelector } from 'react-redux';

import { TEAMS } from '../../../../utilities/constants';


const RowCategorySquare = ({index}) => {
  const currentCategories = useSelector((state) => state.game.rowCategories);
  const team = currentCategories[index]
  const svgSource = TEAMS[team]
  return (
    <div className='row-category-square'>
      <img src={svgSource} index={index}></img>
      <h1>{currentCategories[index]}</h1>
    </div>
  )
}

export default RowCategorySquare;