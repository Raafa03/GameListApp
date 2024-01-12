class GenrePage {
    constructor() {
        this.gameList = document.getElementById('gameList');
        this.genreDropdown = document.getElementById('genreDropdown');
        // Mapeamento de IDs de gênero para seus respectivos nomes
        this.genreMap = {};
        // Mapeamento de IDs de empresa para seus respectivos nomes
        this.companyMap = {};
        // Mapeamento de IDs de plataforma para seus respectivos nomes
        this.platformMap = {};
    }

    fillGenreDropdown(genres) {
        this.genreDropdown.innerHTML = '<option value="">Genres</option>';
        genres.forEach(genre => {
            this.genreMap[genre.id_genre] = genre.genre_desc; // Mapeamento de ID de gênero para nome
            const option = document.createElement('option');
            option.value = genre.id_genre;
            option.textContent = genre.genre_desc;
            this.genreDropdown.appendChild(option);
        });
    }

    async loadGamesByGenre(genreId) {
        try {
            const gamesResponse = await fetch('http://localhost:3000/game').then(response => response.json());

            this.gameList.innerHTML = '';

            gamesResponse.forEach(game => {
                // Verifica se não há gênero selecionado ou se o jogo tem o gênero correspondente
                if (!genreId || parseInt(game.genre_id) === parseInt(genreId)) {
                    const listItem = document.createElement('li');
                    listItem.className = 'gameItem';

                    listItem.innerHTML = `
                        <strong>${game.name}</strong><br>
                        Release Date: ${game.release_date}<br>
                        Rating: ${game.rating}<br>
                        Genre: ${game.genre_id ? this.genreMap[game.genre_id] : 'N/A'}<br>
                        Company: ${game.company_id ? this.companyMap[game.company_id] : 'N/A'}<br>
                        Platform: ${game.platform_id ? this.platformMap[game.platform_id] : 'N/A'}<br>
                        <button id="deleteGameButton" onclick="deleteGame(${game.id_game})">Delete</button>
                        <button id="editGameButton" onclick="editGame(${game.id_game})">Edit</button>
                    `;

                    this.gameList.appendChild(listItem);
                }
            });

        } catch (error) {
            console.error('Error fetching games:', error);
        }
    }

    async init() {
        this.genreDropdown.addEventListener('change', () => {
            const selectedGenreId = this.genreDropdown.value;
            this.loadGamesByGenre(selectedGenreId);
        });

        try {
            const [genreResponse, companyResponse, platformResponse] = await Promise.all([
                fetch('http://localhost:3000/genre').then(response => response.json()),
                fetch('http://localhost:3000/company').then(response => response.json()),
                fetch('http://localhost:3000/platform').then(response => response.json())
            ]);

            this.fillGenreDropdown(genreResponse);

            // Preenche os mapeamentos de empresas e plataformas
            companyResponse.forEach(company => {
                this.companyMap[company.id_company] = company.company_desc;
            });

            platformResponse.forEach(platform => {
                this.platformMap[platform.id_platform] = platform.platform_desc;
            });

            await this.loadGamesByGenre(null); // Carrega todos os jogos inicialmente
        } catch (error) {
            console.error('Error initializing:', error);
        }
    }
}

const genrePage = new GenrePage();
genrePage.init();
