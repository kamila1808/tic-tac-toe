import { View } from "./view.js";
import { Store } from "./store.js";
import { Player } from "./types";

const players: Player[] = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const store = new Store("live-t3-storage-key", players);

  // function initView() {
  //   view.closeAll();
  //   view.clearMoves();
  //   view.setTurnIndicator(store.game.currentPlayer);
  //   view.updateScoreBoard(
  //     store.stats.playerWithStats[0].wins,
  //     store.stats.playerWithStats[1].wins,
  //     store.stats.ties
  //   );
  //   view.initializeMoves(store.game.moves);
  // }


  //Current tab state changes
  store.addEventListener("statechange", () => {
    view.render(store.game, store.stats);
  });

  //A different tab state changes
  window.addEventListener("storage", () => {
    view.render(store.game, store.stats);
  });


  //The first load of the document
  view.render(store.game, store.stats);

  view.bindGameResetEvent((event) => {
    store.reset();
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) {
      return;
    }

    //Advance to the next state by pushing a move to the moves array
    store.playerMove(+square.id);
  });
}

window.addEventListener("load", init);
