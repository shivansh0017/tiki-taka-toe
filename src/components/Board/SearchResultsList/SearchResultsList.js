import SearchReults from "../SearchResult/SearchResult"

const SearchResultsList = ({ results, boardIndex, rowId, colId }) => {
    return (
        <div className='search-bar-results-list'>
            {results.map((result, index) => {
                return <SearchReults result={result} boardIndex={boardIndex} rowId={rowId} colId={colId}/>
            })}
        </div>
    )
}

export default SearchResultsList