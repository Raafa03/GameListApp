function fillDropdown(dropdownId, options) {
    const dropdown = document.getElementById(dropdownId)

    // Limpar as opções 
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

        // Preencher as dropdowns
        fillDropdown('genre_desc', genres)
        fillDropdown('company_desc', companies)
        fillDropdown('platform_desc', platforms)

    } catch (error) {
        console.error('Error loading data:', error)
    }
})

// Validação do form
function validateForm(formDataObject) {
    for (const key in formDataObject) {
        if (!formDataObject[key]) {
            alert(`Please, fill all the fields! The field "${key}" can't be empty`)
            return false
        }

         // Validação do rating
         if (key === 'rating') {
            const rating = parseFloat(formDataObject[key])
            if ( rating < 0 || rating > 10) {
                alert('Please insert a valid rating between 0 and 10')
                return false
            }
        }
    }
    return true
}

// Atualizar o jogo
async function createGame() {
    const gameId = new URLSearchParams(window.location.search).get('id')
    const gameForm = document.getElementById('gameForm')
    const formData = new FormData(gameForm)

    // Criar um objeto JS com os dados do form
    const formDataObject = {}
    formData.forEach((value, key) => {
        formDataObject[key] = value
    })

    // Validar o form
    if (!validateForm(formDataObject)) {
        return
    }

    try {

        const response = await fetch(`http://localhost:3000/game`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
        })

        
        if (response.status === 201) {
            alert('Game added!')
            window.location.href = 'index.html'
        } 
      
    } catch (error) {
        console.error('Error adding game:', error)
        alert('Error adding game: ' + error.message)
    }
}
