import { useSelector } from "react-redux";
import { useEffect } from "react";
import WebFont from 'webfontloader';


import NewGame from "./views/NewGame/NewGame";
import Loader from "./views/Loader/Loader";
import Game from "./views/Game/Game";

import { PAGES } from "./utilities/constants";

import './App.css';

function App() {
  const page = useSelector((state) => state.game.page);
  const game = useSelector(state => state.game);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Outfit']
      }
    })
  });
  return (
    <div className="App">
      {page === PAGES.NEW_GAME && !game.loading ? <NewGame /> : null}
      {game.loading && <Loader />}
      {!game.loading && game.error ? <div>Error: {game.error}</div> : null}
      {page === PAGES.GAME && !game.loading && !game.error ? <Game /> : null}
    </div>
  )
}
export default App
