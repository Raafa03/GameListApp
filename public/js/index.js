    document.addEventListener('DOMContentLoaded', async function () {
    const gameList = document.getElementById('gameList');

    // Mapeamento de IDs de gênero para seus respectivos nomes
    const genreMap = {
        1: 'Ação',
        2: 'Aventura',
        // Adicione mais mapeamentos conforme necessário
    };

    // Mapeamento de IDs de empresa para seus respectivos nomes
    const companyMap = {
        1: 'EA Sports',
        2: 'Ubisoft',
        // Adicione mais mapeamentos conforme necessário
    };

    // Mapeamento de IDs de plataforma para seus respectivos nomes
    const platformMap = {
        1: 'PlayStation',
        2: 'Xbox',
        3: 'PC',
        // Adicione mais mapeamentos conforme necessário
    };

    // Função para carregar a lista de jogos
    async function loadGames() {
        try {

            const response = await fetch('http://localhost:3000/game');
            const games = await response.json();

            console.log('Games:', games);

            gameList.innerHTML = '';

            games.forEach(game => {
                const listItem = document.createElement('li');
                listItem.className = 'gameItem'

                listItem.innerHTML = `
                    <strong>${game.name}</strong><br>
                    Release Date: ${game.release_date}<br>
                    Rating: ${game.rating}<br>
                    Genre: ${game.genre_id ? genreMap[game.genre_id] : 'N/A'}<br>
                    Company: ${game.company_id ? companyMap[game.company_id] : 'N/A'}<br>
                    Platform: ${game.platform_id ? platformMap[game.platform_id] : 'N/A'}<br>
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
0
function editGame(gameId) {
    // Redirecione para a página de edição com o ID do jogo
    window.location.href = `edit.html?id=${gameId}`;
}