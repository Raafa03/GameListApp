// Preencher a dropdown
function fillDropdown(dropdownId, options) {
    const dropdown = document.getElementById(dropdownId)

    // Limpar opções
    dropdown.innerHTML = ''

    // Adicionar opção vazia
    const emptyOption = document.createElement('option')
    emptyOption.value = ''
    emptyOption.textContent = ''
    dropdown.appendChild(emptyOption)

    // Preencher as opções
    options.forEach(option => {
        const optionElement = document.createElement('option')
        optionElement.value = option.id_genre || option.id_company || option.id_platform 
        optionElement.textContent = option.genre_desc || option.company_desc || option.platform_desc 
        dropdown.appendChild(optionElement)
    })
    
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        
        // Carregar dados
        const [genres, companies, platforms] = await Promise.all([
            fetch('http://localhost:3000/genre').then(response => response.json()),
            fetch('http://localhost:3000/company').then(response => response.json()),
            fetch('http://localhost:3000/platform').then(response => response.json())
        ])
        

        // Obter o ID do jogo
        const urlParams = new URLSearchParams(window.location.search)
        const gameId = urlParams.get('id')

        // Obter dados do jogo
        const response = await fetch(`http://localhost:3000/game/${gameId}`)
        const game = await response.json()

        // Preencher as dropdowns
        fillDropdown('editGenre', genres)
        fillDropdown('editCompany', companies)
        fillDropdown('editPlatform', platforms)

        // Preencher os campos do form com os dados do jogo
        document.getElementById('editName').value = game.name
        document.getElementById('editReleaseDate').value = game.release_date
        document.getElementById('editRating').value = game.rating
        document.getElementById('editGenre').value = game.genre_id
        document.getElementById('editCompany').value = game.company_id
        document.getElementById('editPlatform').value = game.platform_id

    } catch (error) {
        console.error('Error loading data:', error)
    }
})

    async function updateGame() {
    const gameId = new URLSearchParams(window.location.search).get('id')
    const editForm = document.getElementById('editForm')
    const formData = new FormData(editForm)

     // Validação do form
     const requiredFields = ['editName', 'editReleaseDate', 'editRating', 'editGenre', 'editCompany', 'editPlatform']
     for (const field of requiredFields) {
         if (!formData.get(field)) {
             alert(`Please fill de field ${field.replace('edit', '')}.`)
             return // Impede o envio do formulário se um campo obrigatório estiver em falta
         }
     }
 
     // Validação do rating
     const rating = parseFloat(formData.get('editRating'))
     if (isNaN(rating) || rating < 0 || rating > 10) {
         alert('Please insert a valid rating between 0 and 10')
         return
     }

    try {
        // Criar um objeto JS com os dados do form
        const formDataObject = {}
        formData.forEach((value, key) => {
            formDataObject[key] = value
        })
        
        
        const response = await fetch(`http://localhost:3000/game/${gameId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
        })

        
        if (response.ok) {
            alert('Game updated !')
            window.location.href = 'index.html'
        } else {
            alert('Error updating game' + response.statusText)
        }
    } catch (error) {
        alert('Error updating game' + error.message)
    }
}