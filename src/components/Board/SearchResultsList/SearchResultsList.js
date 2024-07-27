import SearchReults from "../SearchResult/SearchResult"

const SearchResultsList = ({ results }) => {
    return (
        <div className='search-bar-results-list'>
            {results.map((result, index) => {
                return <SearchReults result={result} key={index}/>
            })}
        </div>
    )
}

export default SearchResultsList