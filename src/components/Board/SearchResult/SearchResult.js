import { useDispatch, useSelector } from "react-redux"
import { checkForPlayerValidity } from "../../../utilities/helpers"
import { addMarkToBoard } from "../../../slices/gameSlice"
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
                    alert("Invalid move")
                }
            })
            }}>
            {result.n}
        </div>
    )
}

export default SearchReults