import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleSearchPlayer } from "../../slices/gameSlice";

const SearchPlayer = () => {
    const dispatch = useDispatch()
    const handleCancel = () => {
        dispatch(toggleSearchPlayer())
    }
    
    return (
        <div className='search-player'>
            <div className='search-player-container'>
                <div className='search-player-wrapper'>
                    <h3 className='search-player-heading'>Player Search</h3>
                    <p className='search-player-description'>Find a past or present player from row and from column.</p>
                    <input className='search-player-input' placeholder='Search Player...'></input>
                </div>
                <div className='search-player-cancel-container'>
                    <button className='search-player-cancel' onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default SearchPlayer