import { useDispatch } from "react-redux"
import { checkForPlayerValidity } from "../../../utilities/helpers"
import { skipTurn, addMarkToBoard } from "../../../slices/gameSlice"

const SearchReults = ({result, boardIndex, rowId, colId}) => {
    const dispatch = useDispatch()
    return (
        <div className="search-results" onClick={(event) => {
            checkForPlayerValidity(result, rowId, colId).then((result) => {
                if(result){
                    dispatch(addMarkToBoard(boardIndex))
                }
                else{
                    dispatch(skipTurn())
                }
            })
            }}>
            {result.n}
        </div>
    )
}

export default SearchReults