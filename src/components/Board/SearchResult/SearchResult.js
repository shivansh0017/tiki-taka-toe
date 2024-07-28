import { checkForPlayerValidity } from "../../../utilities/helpers"

const SearchReults = ({result, rowId, colId}) => {
    return (
        <div className="search-results" onClick={(event) => {
            // alert(
            //     `You clicked on ${result.n}. The rowId is ${rowId} and the colId is ${colId}`
            // )
            alert(`The object is ${result}. The object name is ${result.n}. The object teams array is ${result.t}. The rowId is ${rowId} and the colId is ${colId}`)
            checkForPlayerValidity(result, rowId, colId)
            }}>
            {result.n}
        </div>
    )
}

export default SearchReults