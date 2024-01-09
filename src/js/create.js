"use strict"

let gamesCreated = 0;
let gameApi = undefined;

window.addEventListener("load", async () => {
  gameApi = new GameApi;
  document.getElementById("form").addEventListener("submit", save);
});

const save = (event) => {
  event.preventDefault();
  const payload = gameFromForm(form);
  console.log(payload);
  gameApi.create(payload);
};