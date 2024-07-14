import PlayerSelect from "../../components/PlayerSelect/PlayerSelect"
import StartGameSelect from "../../components/StartGameSelect/StartGameSelect"
import XOLogo from '../../assets/xo-logo.svg';

import './NewGame.css'
function NewGame() {
    return (
        <div className="new-game">
            <h1>TIKI TAKA TOE</h1>
            {/* {(modalState !== MODAL_STATES.NONE) ? <Modal/> : <></>} */}
            <img src={XOLogo} alt="Tic-Tac-Toe logo" className="xologo" /> {/* Used to select difficulty of AI */}
            <PlayerSelect />
            <StartGameSelect />
        </div>
    )
}

export default NewGame