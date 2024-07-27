import SearchReults from "../SearchResult/SearchResult"

const SearchResultsList = ({ results, rowId, colId }) => {
    return (
        <div className='search-bar-results-list'>
            {results.map((result, index) => {
                return <SearchReults result={result} key={index} rowId={rowId} colId={colId}/>
            })}
        </div>
    )
}

export default SearchResultsList