import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFullName } from "../../../utilities/helpers";
import { toggleSearchPlayer } from "../../../slices/gameSlice";
import SearchBar from "../SearchBar/SearchBar";
import SearchResultsList from "../SearchResultsList/SearchResultsList";

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
    const [results, setResults] = useState([])
    const rowId = useSelector((state) => state.game.currentRowId);
    const colId = useSelector((state) => state.game.currentColId);
    const boardIndex = useSelector((state) => state.game.index)

    return (
        <div className='search-player'>
            <div className='search-player-enter-container'>
                <h3 className='search-player-heading'>Player Search</h3>
                <div className="search-player-description">
                    <p className='search-player-description-paragraph'>Find a past or present player from <span className="search-player-description-teamName">{rowName}</span> and <span className="search-player-description-teamName">{colName}</span>.</p>
                </div>
                <div className="search-bar-container">
                    <SearchBar setResults={setResults}/>
                    <SearchResultsList results={results} boardIndex={boardIndex} rowId={rowId} colId={colId}/>
                </div>
            </div>
            <div className='search-player-cancel-container'>
                <button className='search-player-cancel' onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default SearchPlayer