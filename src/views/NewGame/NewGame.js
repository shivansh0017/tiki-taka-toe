import PlayerSelect from "../../components/PlayerSelect/PlayerSelect"
import StartGameSelect from "../../components/StartGameSelect/StartGameSelect"
import XOLogo from '../../assets/xo-logo.svg';

import './NewGame.css'
function NewGame() {
    return (
        <div className="new-game">
            <img src={XOLogo} alt="Tic-Tac-Toe logo" className="xologo" />
            <PlayerSelect />
            <StartGameSelect />
        </div>
    )
}

export default NewGame