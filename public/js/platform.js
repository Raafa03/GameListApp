class PlatformPage {
    constructor() {
        this.gameList = document.getElementById('gameList');
        this.platformDropdown = document.getElementById('platformDropdown');
        // Mapeamento de IDs de gênero para seus respectivos nomes
        this.genreMap = {};
        // Mapeamento de IDs de empresa para seus respectivos nomes
        this.companyMap = {};
        // Mapeamento de IDs de plataforma para seus respectivos nomes
        this.platformMap = {};
    }

    fillPlatformDropdown(platforms) {
        this.platformDropdown.innerHTML = '<option value="">Platforms</option>';
        platforms.forEach(platform => {
            this.platformMap[platform.id_platform] = platform.platform_desc; // Mapeamento de ID de plataforma para nome
            const option = document.createElement('option');
            option.value = platform.id_platform;
            option.textContent = platform.platform_desc;
            this.platformDropdown.appendChild(option);
        });
    }

    async loadGamesByPlatform(platformId) {
        try {
            const gamesResponse = await fetch('http://localhost:3000/game').then(response => response.json());

            this.gameList.innerHTML = '';

            gamesResponse.forEach(game => {
                // Verifica se não há plataforma selecionada ou se o jogo tem a plataforma correspondente
                if (!platformId || parseInt(game.platform_id) === parseInt(platformId)) {
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
        this.platformDropdown.addEventListener('change', () => {
            const selectedPlatformId = this.platformDropdown.value;
            this.loadGamesByPlatform(selectedPlatformId);
        });

        try {
            const [genreResponse, companyResponse, platformResponse] = await Promise.all([
                fetch('http://localhost:3000/genre').then(response => response.json()),
                fetch('http://localhost:3000/company').then(response => response.json()),
                fetch('http://localhost:3000/platform').then(response => response.json())
            ]);

            this.fillPlatformDropdown(platformResponse);

            // Preenche os mapeamentos de gêneros e empresas
            genreResponse.forEach(genre => {
                this.genreMap[genre.id_genre] = genre.genre_desc;
            });

            companyResponse.forEach(company => {
                this.companyMap[company.id_company] = company.company_desc;
            });

            await this.loadGamesByPlatform(null); // Carrega todos os jogos inicialmente
        } catch (error) {
            console.error('Error initializing:', error);
        }
    }
}

const platformPage = new PlatformPage();
platformPage.init();
