import { useState } from "react"
import { FaSearch } from "react-icons/fa"

const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("")
    const fetchData = (value) => {
        fetch('players.json')
            .then((response) => response.json())
            .then(json => {
                const results = json.players.filter((user) => {
                    return (
                        value &&
                        user &&
                        user.n &&
                        user.n.toLowerCase().includes(value)
                    )
                })
                setResults(results)
            })
    }
    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }
    return (
        <div className='search-bar'>
            <FaSearch id="search-icon" />
            <input className="search-player-input" placeholder="Search player..." value={input} onChange={(event) => handleChange(event.target.value)} />
        </div>
    )
}

export default SearchBar