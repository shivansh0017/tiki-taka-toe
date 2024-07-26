import { useDispatch, useSelector } from "react-redux";
import { toggleSearchPlayer } from "../../slices/gameSlice";
import { getFullName } from "../../utilities/helpers";

const SearchPlayer = () => {
    const dispatch = useDispatch()
    const handleCancel = () => {
        dispatch(toggleSearchPlayer())
    }
    const row = useSelector((state) => state.game.row)
    const col = useSelector((state) => state.game.col)
    const rowCategories = useSelector((state) => state.game.rowCategories)
    const columnCategories = useSelector((state) => state.game.columnCategories)
    const rowName = getFullName(rowCategories[row])
    const colName = getFullName(columnCategories[col])
    return (
        <div className='search-player'>
            <div className='search-player-container'>
                <div className='search-player-wrapper'>
                    <h3 className='search-player-heading'>Player Search</h3>
                    <p className='search-player-description'>Find a past or present player from {rowName} and {colName}.</p>
                    <input className='search-player-input' placeholder='Search Player...'></input>
                </div>
                <div className='search-player-action-container'>
                    <button className='search-player-cancel' onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default SearchPlayer