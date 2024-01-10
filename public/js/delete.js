    async function deleteGame(gameId) {
        try {
            const response = await fetch(`http://localhost:3000/game/${gameId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Jogo excluído com sucesso - exibir pop-up
                alert('Jogo excluído com sucesso!');
                // Recarregar a página para atualizar a lista de jogos
                window.location.reload();
            } else {
                // Exibir mensagem de erro em pop-up
                alert('Erro ao excluir jogo: ' + response.statusText);
            }
        } catch (error) {
            // Exibir mensagem de erro em pop-up
            alert('Erro ao excluir jogo: ' + error.message);
        }
    }
