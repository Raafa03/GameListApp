document.addEventListener('DOMContentLoaded', async function () {
    const gameList = document.getElementById('gameList');

    // Mapeamento de IDs de gênero para seus respectivos nomes
    const genreMap = {};
    // Mapeamento de IDs de empresa para seus respectivos nomes
    const companyMap = {};
    // Mapeamento de IDs de plataforma para seus respectivos nomes
    const platformMap = {};

    // Função para carregar a lista de jogos
    async function loadGames() {
        try {
            const [gamesResponse, genreResponse, companyResponse, platformResponse] = await Promise.all([
                fetch('http://localhost:3000/game').then(response => response.json()),
                fetch('http://localhost:3000/genre').then(response => response.json()),
                fetch('http://localhost:3000/company').then(response => response.json()),
                fetch('http://localhost:3000/platform').then(response => response.json())
            ]);


            console.log('Games:', gamesResponse);

            gameList.innerHTML = '';

            gamesResponse.forEach(game => {
                const listItem = document.createElement('li');
                listItem.className = 'gameItem';
            
                listItem.innerHTML = `
                    <strong>${game.name}</strong><br>
                    Release Date: ${game.release_date}<br>
                    Rating: ${game.rating}<br>
                    Genre: ${game.genre_id ? genreResponse.find(genre => genre.id_genre === game.genre_id).genre_desc : 'N/A'}<br>
                    Company: ${game.company_id ? companyResponse.find(company => company.id_company === game.company_id).company_desc : 'N/A'}<br>
                    Platform: ${game.platform_id ? platformResponse.find(platform => platform.id_platform === game.platform_id).platform_desc : 'N/A'}<br>
                    <button onclick="deleteGame(${game.id_game})">Excluir</button>
                    <button onclick="editGame(${game.id_game})">Editar</button>
                `;
                gameList.appendChild(listItem);
            });

        } catch (error) {
            console.error('Error fetching games:', error);
        }
    }

    // Inicializa a lista de jogos ao carregar a página
    await loadGames();
});

function editGame(gameId) {
    // Redirecione para a página de edição com o ID do jogo
    window.location.href = `edit.html?id=${gameId}`;
}