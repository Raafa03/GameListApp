class PlatformPage {
    constructor() {
        this.gameList = document.getElementById('gameList')
        this.genreDropdown = document.getElementById('genreDropdown')
        this.companyDropdown = document.getElementById('companyDropdown')
        this.platformDropdown = document.getElementById('platformDropdown')
        this.genreMap = {}
        this.companyMap = {}
        this.platformMap = {}
    }

    async loadGamesByPlatform(platformId, companyId, genreId) {
        try {
            const gamesResponse = await fetch('http://localhost:3000/game').then(response => response.json())

            this.gameList.innerHTML = ''

            gamesResponse.forEach(game => {
                const platformMatch = !platformId || parseInt(game.platform_id) === parseInt(platformId)
                const companyMatch = !companyId || parseInt(game.company_id) === parseInt(companyId)
                const genreMatch = !genreId || parseInt(game.genre_id) === parseInt(genreId)

                if (platformMatch && companyMatch && genreMatch) {
                    const listItem = document.createElement('li')
                    listItem.className = 'gameItem'

                    listItem.innerHTML = `
                        <strong>${game.name}</strong><br>
                        Release Date: ${game.release_date}<br>
                        Rating: ${game.rating}<br>
                        Genre: ${game.genre_id ? this.genreMap[game.genre_id] : 'N/A'}<br>
                        Company: ${game.company_id ? this.companyMap[game.company_id] : 'N/A'}<br>
                        Platform: ${game.platform_id ? this.platformMap[game.platform_id] : 'N/A'}<br>
                        <button id="deleteGameButton" onclick="deleteGame(${game.id_game})">Delete</button>
                        <button id="editGameButton" onclick="editGame(${game.id_game})">Edit</button>
                    `

                    this.gameList.appendChild(listItem)
                }
            })

        } catch (error) {
            console.error('Error fetching games:', error)
        }
    }

    async init() {
        this.genreDropdown.addEventListener('change', () => {
            const selectedPlatformId = this.platformDropdown.value
            const selectedCompanyId = this.companyDropdown.value
            const selectedGenreId = this.genreDropdown.value

            this.loadGamesByPlatform(selectedPlatformId, selectedCompanyId, selectedGenreId)
        })

        this.companyDropdown.addEventListener('change', () => {
            const selectedPlatformId = this.platformDropdown.value
            const selectedCompanyId = this.companyDropdown.value
            const selectedGenreId = this.genreDropdown.value

            this.loadGamesByPlatform(selectedPlatformId, selectedCompanyId, selectedGenreId)
        })

        this.platformDropdown.addEventListener('change', () => {
            const selectedPlatformId = this.platformDropdown.value
            const selectedCompanyId = this.companyDropdown.value
            const selectedGenreId = this.genreDropdown.value

            this.loadGamesByPlatform(selectedPlatformId, selectedCompanyId, selectedGenreId)
        })

        try {
            const [genreResponse, companyResponse, platformResponse] = await Promise.all([
                fetch('http://localhost:3000/genre').then(response => response.json()),
                fetch('http://localhost:3000/company').then(response => response.json()),
                fetch('http://localhost:3000/platform').then(response => response.json())
            ])

            this.fillGenreDropdown(genreResponse)
            this.fillCompanyDropdown(companyResponse)
            this.fillPlatformDropdown(platformResponse)

            genreResponse.forEach(genre => {
                this.genreMap[genre.id_genre] = genre.genre_desc
            })

            companyResponse.forEach(company => {
                this.companyMap[company.id_company] = company.company_desc
            })

            await this.loadGamesByPlatform(null, null, null)
        } catch (error) {
            console.error('Error initializing:', error)
        }
    }

    fillGenreDropdown(genres) {
        this.genreDropdown.innerHTML = '<option value="">All Genres</option>'
        genres.forEach(genre => {
            this.genreMap[genre.id_genre] = genre.genre_desc
            const option = document.createElement('option')
            option.value = genre.id_genre
            option.textContent = genre.genre_desc
            this.genreDropdown.appendChild(option)
        })
    }

    fillCompanyDropdown(companies) {
        this.companyDropdown.innerHTML = '<option value="">All Companies</option>'
        companies.forEach(company => {
            this.companyMap[company.id_company] = company.company_desc
            const option = document.createElement('option')
            option.value = company.id_company
            option.textContent = company.company_desc
            this.companyDropdown.appendChild(option)
        })
    }

    fillPlatformDropdown(platforms) {
        this.platformDropdown.innerHTML = '<option value="">All Platforms</option>'
        platforms.forEach(platform => {
            this.platformMap[platform.id_platform] = platform.platform_desc
            const option = document.createElement('option')
            option.value = platform.id_platform
            option.textContent = platform.platform_desc
            this.platformDropdown.appendChild(option)
        })
    }
}

const platformPage = new PlatformPage()
platformPage.init()
