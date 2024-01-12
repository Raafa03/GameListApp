import { Database } from "sqlite"
import { Company } from "../model/company.model.js"

export class CompanyRepository {

    private db: Database = null

    constructor(db : Database) {
        this.db = db
    }

    async addCompany(company_desc: string): Promise<number> {
        const result = await this.db.run(
            "INSERT INTO company(company_desc) VALUES (?)",
            company_desc
        )

        return result.lastID
    }

    async getCompanys(): Promise<Company[]> {
        const records = await this.db.all("SELECT * FROM company")
         return records.map((record): Company => {
             return {
                 id_company: record.id_company,
                 company_desc: record.company_desc,
             }
         })
     }

    async getCompanyById(id:number): Promise<Company> {
        const row = await this.db.get("SELECT * FROM company WHERE id_company = ?", id)

        if (!row) {
            return null
        }

        return {
            id_company: row.id_company,
            company_desc: row.company_desc,
        }
    }

    async updateCompanyById(id_company: number, company_desc: string): Promise<Company> {
        const result = await this.db.run(
            "UPDATE company SET company_desc=? WHERE id_company=?",
            company_desc,
            id_company
        )

        if (result.changes === 0) {
            return null
        }

        return {
            id_company,
            company_desc
        }
    }

    async deleteCompanyById(id_company: number): Promise<Company> {
        const companyToDelete = await this.getCompanyById(id_company)

        if (!companyToDelete) {
            return null 
        }

        await this.db.run("DELETE FROM company WHERE id_company=?", id_company)

        return companyToDelete
    }
}