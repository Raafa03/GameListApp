class CompanyPage {
    constructor() {
        this.gameList = document.getElementById('gameList');
        this.companyDropdown = document.getElementById('companyDropdown');
        // Mapeamento de IDs de gênero para seus respectivos nomes
        this.genreMap = {};
        // Mapeamento de IDs de empresa para seus respectivos nomes
        this.companyMap = {};
        // Mapeamento de IDs de plataforma para seus respectivos nomes
        this.platformMap = {};
    }

    fillCompanyDropdown(companies) {
        this.companyDropdown.innerHTML = '<option value="">Companies</option>';
        companies.forEach(company => {
            this.companyMap[company.id_company] = company.company_desc; // Mapeamento de ID de empresa para nome
            const option = document.createElement('option');
            option.value = company.id_company;
            option.textContent = company.company_desc;
            this.companyDropdown.appendChild(option);
        });
    }

    async loadGamesByCompany(companyId) {
        try {
            const gamesResponse = await fetch('http://localhost:3000/game').then(response => response.json());

            this.gameList.innerHTML = '';

            gamesResponse.forEach(game => {
                // Verifica se não há empresa selecionada ou se o jogo tem a empresa correspondente
                if (!companyId || parseInt(game.company_id) === parseInt(companyId)) {
                    const listItem = document.createElement('li');
                    listItem.className = 'gameItem';

                    listItem.innerHTML = `
                        <strong>${game.name}</strong><br>
                        Release Date: ${game.release_date}<br>
                        Rating: ${game.rating}<br>
                        Genre: ${game.genre_id ? this.genreMap[game.genre_id] : 'N/A'}<br>
                        Company: ${game.company_id ? this.companyMap[game.company_id] : 'N/A'}<br>
                        Platform: ${game.platform_id ? this.platformMap[game.platform_id] : 'N/A'}<br>
                        <button id="deleteGameButton" onclick="deleteGame(${game.id_game})">Excluir</button>
                        <button id="editGameButton" onclick="editGame(${game.id_game})">Editar</button>
                    `;

                    this.gameList.appendChild(listItem);
                }
            });

        } catch (error) {
            console.error('Error fetching games:', error);
        }
    }

    async init() {
        this.companyDropdown.addEventListener('change', () => {
            const selectedCompanyId = this.companyDropdown.value;
            this.loadGamesByCompany(selectedCompanyId);
        });

        try {
            const [genreResponse, companyResponse, platformResponse] = await Promise.all([
                fetch('http://localhost:3000/genre').then(response => response.json()),
                fetch('http://localhost:3000/company').then(response => response.json()),
                fetch('http://localhost:3000/platform').then(response => response.json())
            ]);

            this.fillCompanyDropdown(companyResponse);

            // Preenche os mapeamentos de gêneros e plataformas
            genreResponse.forEach(genre => {
                this.genreMap[genre.id_genre] = genre.genre_desc;
            });

            platformResponse.forEach(platform => {
                this.platformMap[platform.id_platform] = platform.platform_desc;
            });

            await this.loadGamesByCompany(null); // Carrega todos os jogos inicialmente
        } catch (error) {
            console.error('Error initializing:', error);
        }
    }
}

const companyPage = new CompanyPage();
companyPage.init();
