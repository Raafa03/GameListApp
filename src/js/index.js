"use strict"

let container = undefined

window.addEventListener("load", async () => {
    container = document.getElementById("container");


    const gameApi = new GameApi()

    let games = await gameApi.find()
    console.log(games)

    for (const game of games) {
        addPerson(game)
    }
})

/**
 * 
 * @param {Game} game 
 */
const addGame = (game) => {
    const gameRoot = document.createElement("div")
    const gameProps = document.createElement("ul")


    addProperty("Name: ", `${game.name} ${person.lastName}`, gameProps)
    addProperty("Release Date: ", game.release_date, gameProps);
    addProperty("Rating: ", pergameson.rating, gameProps);

    container.appendChild(gameRoot);
    personRoot.appendChild(gameProps);

    if (person.contacts) {
        const personContacts = document.createElement("ul")

        for (const contact of person.contacts) {
            addProperty(`${contact.type}: `, contact.value, personContacts);
        }

        personProps.appendChild(personContacts)
    }

    const editLink = document.createElement("a")
    editLink.type = "button"
    editLink.href = "/edit/1"
    editLink.innerText = "Edit"

    const editButton = document.createElement("button")
    editButton.onclick = () => window.location.href = "/edit.html?person="+person.id
    editButton.innerText = "Edit"

    const deleteButton = document.createElement("button")
    deleteButton.onclick = () => {
        alert("DELETE CONTACT " + person.id)
    }
    deleteButton.innerText = "Delete"

    personProps.appendChild(editButton)
    personProps.appendChild(deleteButton)
}

const addProperty = (label, value, target) => {
    const labelItem = document.createElement("b")
    const valueItem = document.createElement("span")

    labelItem.innerText = label
    valueItem.innerText = value

    const li = document.createElement("li")
    li.appendChild(labelItem)
    li.appendChild(valueItem)
    target.appendChild(li)
}