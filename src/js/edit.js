"use strict"

let gamesCreated = 0;
let gameApi = undefined;

window.addEventListener("load", async () => {
    gameApi = new GameApi();

    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("game");
    const game = await loadGame(gameId)

    document.getElementById("name").innerText = `${game.name}`

    document.getElementById("form").addEventListener("submit", save)
})

const loadGame = async (id_game) => {
    const game = await gameApi.get(id_game)
    fillForm(game)
    return game
}

const save = (event) => {
    event.preventDefault()
    const payload = gameFromForm(form)
    console.log(payload)
    gameApi.update(payload.id_game, payload)
}