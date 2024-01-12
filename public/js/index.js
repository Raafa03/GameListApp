document.addEventListener('DOMContentLoaded', async function () {
    const gameList = document.getElementById('gameList')
    const sortOptionSelect = document.getElementById('sortOption')
    const genreDropdown = document.getElementById('genreDropdown')
    const companyDropdown = document.getElementById('companyDropdown')
    const platformDropdown = document.getElementById('platformDropdown')


    let selectedGenreId = genreDropdown.value
    let selectedCompanyId = companyDropdown.value
    let selectedPlatformId = platformDropdown.value


    async function loadGames() {
        try {
            const [gamesResponse, genreResponse, companyResponse, platformResponse] = await Promise.all([
                fetch('http://localhost:3000/game').then(response => response.json()),
                fetch('http://localhost:3000/genre').then(response => response.json()),
                fetch('http://localhost:3000/company').then(response => response.json()),
                fetch('http://localhost:3000/platform').then(response => response.json())
            ])
    
            selectedGenreId = genreDropdown.value
            selectedCompanyId = companyDropdown.value
            selectedPlatformId = platformDropdown.value
    
            // Barra de Pesquisa
            const searchInput = document.getElementById('gameSearchInput')
            const name = searchInput.value.trim().toLowerCase()
            const filteredGames = gamesResponse.filter(game => game.name.toLowerCase().includes(name))
    
            // Filtro Order By
            const sortOption = sortOptionSelect.value
            filteredGames.sort((a, b) => {
                switch (sortOption) {
                    case 'releaseDateDesc':
                        return new Date(b.release_date) - new Date(a.release_date)
                    case 'releaseDateAsc':
                        return new Date(a.release_date) - new Date(b.release_date)
                    case 'ratingDesc':
                        return b.rating - a.rating
                    case 'ratingAsc':
                        return a.rating - b.rating
                    case 'nameAsc':
                        return a.name.localeCompare(b.name)
                    case 'nameDesc':
                        return b.name.localeCompare(a.name)
                    default:
                        return 0 
                }
            })
    
            gameList.innerHTML = ''
    
            filteredGames.forEach(game => {
                const genreMatch = !selectedGenreId || parseInt(game.genre_id) === parseInt(selectedGenreId)
                const companyMatch = !selectedCompanyId || parseInt(game.company_id) === parseInt(selectedCompanyId)
                const platformMatch = !selectedPlatformId || parseInt(game.platform_id) === parseInt(selectedPlatformId)
    
                if (genreMatch && companyMatch && platformMatch) {
                    const listItem = document.createElement('li')
                    listItem.className = 'gameItem'
    
                    listItem.innerHTML = `
                        <strong>${game.name}</strong><br>
                        Release Date: ${game.release_date}<br>
                        Rating: ${game.rating}<br>
                        Genre: ${game.genre_id ? genreResponse.find(genre => genre.id_genre === game.genre_id).genre_desc : 'N/A'}<br>
                        Company: ${game.company_id ? companyResponse.find(company => company.id_company === game.company_id).company_desc : 'N/A'}<br>
                        Platform: ${game.platform_id ? platformResponse.find(platform => platform.id_platform === game.platform_id).platform_desc : 'N/A'}<br>
                        <button id="deleteGameButton" onclick="deleteGame(${game.id_game})">Delete</button>
                        <button id="editGameButton" onclick="editGame(${game.id_game})">Edit</button>
                    `
    
                    gameList.appendChild(listItem)
                }
            })
    
        } catch (error) {
            console.error('Error fetching games:', error)
        }
    }
    

    await loadGames()
    sortOptionSelect.addEventListener('change', loadGames)
})

function editGame(gameId) {
    window.location.href = `edit.html?id=${gameId}`
}

async function searchGames() {
    const searchInput = document.getElementById('gameSearchInput')
    const name = searchInput.value.trim()
  
    if (name) {
      try {
        const [gamesResponse, genreResponse, companyResponse, platformResponse] = await Promise.all([
            fetch('http://localhost:3000/game').then(response => response.json()),
            fetch('http://localhost:3000/genre').then(response => response.json()),
            fetch('http://localhost:3000/company').then(response => response.json()),
            fetch('http://localhost:3000/platform').then(response => response.json())
        ])

        const filteredGames = gamesResponse.filter(game => game.name.toLowerCase().includes(name.toLowerCase()))
        const sortedGames = orderGames(filteredGames)
        displayGames(sortedGames, genreResponse, companyResponse, platformResponse)
      } catch (error) {
        console.error('Error searching games:', error)
      }
    }
}

function orderGames(games) {
    const sortOptionSelect = document.getElementById('sortOption')
    const sortOption = sortOptionSelect.value

    return games.sort((a, b) => {
        switch (sortOption) {
            case 'releaseDateDesc':
                return new Date(b.release_date) - new Date(a.release_date)
            case 'releaseDateAsc':
                return new Date(a.release_date) - new Date(b.release_date)
            case 'ratingDesc':
                return b.rating - a.rating
            case 'ratingAsc':
                return a.rating - b.rating
            case 'nameAsc':
                return a.name.localeCompare(b.name)
            case 'nameDesc':
                return b.name.localeCompare(a.name)
            default:
                return 0
        }
    })
}


function displayGames(games, genreResponse, companyResponse, platformResponse) {
    const gameList = document.getElementById('gameList')
    gameList.innerHTML = ''

    games.forEach(game => {
      const listItem = document.createElement('li')
      listItem.className = 'gameItem'

      listItem.innerHTML = `
        <strong>${game.name}</strong><br>
        Release Date: ${game.release_date}<br>
        Rating: ${game.rating}<br>
        Genre: ${game.genre_id ? genreResponse.find(genre => genre.id_genre === game.genre_id).genre_desc : 'N/A'}<br>
        Company: ${game.company_id ? companyResponse.find(company => company.id_company === game.company_id).company_desc : 'N/A'}<br>
        Platform: ${game.platform_id ? platformResponse.find(platform => platform.id_platform === game.platform_id).platform_desc : 'N/A'}<br>
        <button id="deleteGameButton" onclick="deleteGame(${game.id_game})">Delete</button>
        <button id="editGameButton" onclick="editGame(${game.id_game})">Edit</button>
      `

      gameList.appendChild(listItem)
    })
}
