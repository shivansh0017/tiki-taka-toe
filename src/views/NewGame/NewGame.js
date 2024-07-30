// import { useSelector, useDispatch } from "react-redux";
// import PlayerSelect from "../../components/PlayerSelect/PlayerSelect"
// import StartGameSelect from "../../components/StartGameSelect/StartGameSelect"
// import XOLogo from '../../assets/xo-logo.svg';

// import './NewGame.css'
// import { toggleInstructions } from "../../slices/gameSlice";
// import { MODAL_STATES } from "../../utilities/constants";
// import Modal from "../../components/Modal/Modal";
// function NewGame() {
//     const dispatch = useDispatch();
//     const modalState = useSelector((state) => state.game.modalState);

//     const handleInstructions = () => {
//         dispatch(toggleInstructions())
//     }

//     return (
//         <div className="new-game">
//             {
//                 (modalState !== MODAL_STATES.NONE) ?
//                     <Modal /> :
//                     <></>
//             }
//             {text === instructions ? 
//             <img src={XOLogo} alt="Tic-Tac-Toe logo" className="xologo" onClick={handleInstructions} /> : 
//             <PlayerSelect />
//             <StartGameSelect />
//         </div>
//     )
// }

// export default NewGame

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerSelect from "../../components/PlayerSelect/PlayerSelect";
import StartGameSelect from "../../components/StartGameSelect/StartGameSelect";
import XOLogo from '../../assets/xo-logo.svg';
import './NewGame.css';
import { toggleInstructions } from "../../slices/gameSlice";
import { MODAL_STATES } from "../../utilities/constants";
import Modal from "../../components/Modal/Modal";

function NewGame() {
    const dispatch = useDispatch();
    const modalState = useSelector((state) => state.game.modalState);

    const handleInstructions = () => {
        dispatch(toggleInstructions())
    }

    return (
        <div className="new-game">
            {
                (modalState !== MODAL_STATES.NONE) ?
                    <Modal /> :
                    <></>
            }
            <div onClick={handleInstructions}>
                <img src={XOLogo} alt="Tic-Tac-Toe logo" className="xologo"  /> 
                <h1>How to play?</h1>
            </div>
            <PlayerSelect />
            <StartGameSelect />
        </div>
    );
}

export default NewGame;