"use strict";

class GenreApi {
  /**
   * @returns {Promise<Genre[]>}
   */
  async find() {
    return (await fetch(`/genre`)).json();
  }

  /**
   * 
   * @param {number} id_genre 
   * @returns {Promise<Genre>}
   */
  async get(id_genre) {
    return (await fetch(`/genre/${id_genre}`)).json()
  }

  async getGenres() {
    return (await fetch("/genre")).json();
  }

  /**
   * @param {number} id_genre 
   * @param {Genre} value 
   * @returns {Promise<Genre>}
   */
  async update(id_genre, value) {
    const req = fetch(`/genre/${id_genre}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    })

    return (await req).json()
  }

  async create(value) {
    const req = fetch(`/genre`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    return (await req).json();
  }
}