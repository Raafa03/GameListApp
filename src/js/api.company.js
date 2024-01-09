"use strict";

class CompanyApi {
  /**
   * @returns {Promise<Company[]>}
   */
  async find() {
    return (await fetch(`/company`)).json();
  }

  /**
   * 
   * @param {number} id_company 
   * @returns {Promise<Company>}
   */
  async get(id_company) {
    return (await fetch(`/company/${id_company}`)).json()
  }

  async getCompanies() {
    return (await fetch("/company")).json();
  }

  /**
   * @param {number} id_company 
   * @param {Genre} value 
   * @returns {Promise<Company>}
   */
  async update(id_company, value) {
    const req = fetch(`/company/${id_company}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    })

    return (await req).json()
  }

  async create(value) {
    const req = fetch(`/company`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    return (await req).json();
  }
}