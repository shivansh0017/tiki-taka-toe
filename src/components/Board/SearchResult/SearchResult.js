const SearchReults = ({result}) => {
    return (
        <div className="search-results" onClick={(event) => alert(`You clicked on ${result.n}`)}>
            {result.n}
        </div>
    )
}

export default SearchReults