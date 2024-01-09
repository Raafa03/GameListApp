"use strict";

class GameForm {
  constructor(formId) {
    this.form = document.getElementById(formId);

    window.addEventListener("load", () => {
      this.initializeForm();
    });
  }

  initializeForm() {
    this.populateDropdowns();
    // Adicione event listener, se necessário
  }

  async populateDropdowns() {
    // Obtém dados necessários do servidor (gêneros e empresas)
    const genres = await api.getGenres(); // Substitua pela chamada real da API
    const companies = await api.getCompanies(); // Substitua pela chamada real da API

    this.populateDropdown("genreName", genres);
    this.populateDropdown("companyName", companies);
  }

  populateDropdown(selectId, options) {
    const selectElement = this.form.querySelector(`#${selectId}`);
    selectElement.innerHTML = "";

    options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option.id;
      optionElement.text = option.name; // Substitua pelo campo desejado (nome, por exemplo)
      selectElement.add(optionElement);
    });
  }

  getFormData() {
    const formData = new FormData(this.form);
    const contacts = [];

    for (let i = 0; i < contactsCreated; i++) {
      const type = formData.get(`contact_type_${i}`);
      const value = formData.get(`contact_value_${i}`);
      if (type && value) {
        contacts.push({
          type: type,
          value: value,
        });
      }
    }

    const payload = {
      id: parseInt(formData.get("id")),
      firstName: formData.get("first_name"),
      lastName: formData.get("last_name"),
      company: formData.get("company"),
      address: formData.get("address"),
      genreId: formData.get("genreName"), // Substitua pelo campo desejado
      companyId: formData.get("companyName"), // Substitua pelo campo desejado
      
    };

    return payload;
  }

  // Restante do código...
}

// Utilize a classe GameForm
const gameForm = new GameForm("form");