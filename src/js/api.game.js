"use strict";

class GameApi {
  /**
   * @returns {Promise<Game[]>}
   */
  async find() {
    return (await fetch(`http://localhost:3000/game`)).json();
  }

  /**
   * 
   * @param {number} id_game 
   * @returns {Promise<Game>}
   */
  async get(id_game) {
    return (await fetch(`http://localhost:3000/game${id_game}`)).json()
  }

  /**
   * @param {number} id_game 
   * @param {Game} value 
   * @returns {Promise<Game>}
   */
  async update(id_game, value) {
    const req = fetch(`http://localhost:3000/game${id_game}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    })

    return (await req).json()
  }

  async create(value) {
    const req = fetch(`http://localhost:3000/game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    return (await req).json();
  }
}