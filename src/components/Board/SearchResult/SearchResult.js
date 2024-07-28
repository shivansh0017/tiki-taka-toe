import { useDispatch, useSelector } from "react-redux"
import { checkForPlayerValidity } from "../../../utilities/helpers"
import { addedIncorrectPlayerToBoard, addMarkToBoard } from "../../../slices/gameSlice"
import { MARKS } from "../../../utilities/constants"

const SearchReults = ({result, boardIndex, rowId, colId}) => {
    const dispatch = useDispatch()
    const currentMark = useSelector((state) => state.game.currentMark)
    return (
        <div className="search-results" onClick={(event) => {
            checkForPlayerValidity(result, rowId, colId).then((result) => {
                if(result){
                    dispatch(addMarkToBoard(boardIndex))
                }
                else{
                    dispatch(addedIncorrectPlayerToBoard())
                }
            })
            }}>
            {result.n}
        </div>
    )
}

export default SearchReults