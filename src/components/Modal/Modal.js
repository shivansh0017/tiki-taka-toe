import { useDispatch, useSelector } from 'react-redux';

import ModalBottom from '../Modal/ModalBottom/ModalBottom';
import ModalTop from '../Modal/ModalTop/ModalTop';
import {
  toggleSettings,
  restartGame,
  reset,
  togglePause,
  fetchTeams,
  toggleSkipTurn,
  skipTurn,
} from '../../slices/gameSlice';

import { MODAL_STATES, PAGES } from '../../utilities/constants';

import './Modal.css';

function Modal() {
  const modalState = useSelector((state) => state.game.modalState);
  const page = useSelector((state) => state.game.page);
  const dispatch = useDispatch();

  const handleGameCancel = () => {
    dispatch(toggleSettings());
  }

  const handleRestartGame = () => {
    dispatch(restartGame());
    dispatch(fetchTeams());
  }

  const handleQuit = () => {
    dispatch(reset());
  }

  const handleTogglePause = () => {
    dispatch(togglePause());
  }

  const handleSkip = () => {
    dispatch(skipTurn());
  }

  const handleToggleSkip = () => {
    dispatch(toggleSkipTurn());
  }
  
  const selectModal = () => {
    switch (modalState) {
      case MODAL_STATES.PAUSED: {
        return (
          <>
            <ModalBottom />
            <div className="modal-choices">
              <button onClick={handleRestartGame} id="modal-restart">YES, RESTART</button>
              <button onClick={handleTogglePause} id="modal-cancel">NO, CANCEL</button>
            </div>
          </>
        )
      }
      case MODAL_STATES.QUIT_GAME: {
        return (
          <>
            <ModalTop />
            <ModalBottom />
            <div className="modal-choices">
              <button onClick={handleQuit} id="modal-quit">QUIT</button>
              <button onClick={handleRestartGame} id="modal-nextround">NEXT ROUND</button>
            </div>
          </>
        )
      }
      case MODAL_STATES.SKIP:{
        return (
          <>
            <ModalBottom />
            <div className="modal-choices">
              <button onClick={handleSkip} id="modal-skip">YES</button>
              <button onClick={handleToggleSkip} id="modal-cancel">NO</button>
            </div>
          </>
        )
      }
      case MODAL_STATES.SETTINGS: {
        return (
          <>
            <div className="modal-choices-settings">
              <div id="modal-choices-title">QUIT GAME ?</div>
              <div className="modal-choices-quit-or-cancel">
                {page !== PAGES.NEW_GAME &&
                  <button className="modal-choices-quit-game" onClick={handleQuit}>
                    <div>YES</div>
                  </button>
                }
                <button className="modal-choices-cancel" onClick={handleGameCancel}>
                  <div>NO</div>
                </button>
              </div>
            </div>
          </>
        )
      }
      default: {
        break;
      }
    }
  }

  return (
    <div className="modal-background">
      <div className="modal-bar">
        <div className="modal-content">
          {selectModal()}
        </div>
      </div>
    </div>
  );
}

export default Modal;