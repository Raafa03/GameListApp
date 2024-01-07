import { Request, Response } from "express";
import { CompanyRepository } from "../repository/company.repository.js";

export class CompanyController {

    private companyRepository: CompanyRepository

    constructor(companyRepository : CompanyRepository) {
        this.companyRepository = companyRepository
    }

    async listCompanys(req: Request, res: Response) {
        const companys = await this.companyRepository.getCompanys()
        res.status(200).json(companys)
    }

    async getCompany(req: Request, res: Response){
        const { companyId } = req.params
        const company= await this.companyRepository.getCompanyById(parseInt(companyId))

        if(!company){
            res.status(404).json({error: "company not found"})
        }

        res.status(200).json(company)
    }

    async addCompany(req: Request, res: Response){
        const {company_desc} = req.body

        const id = await this.companyRepository.addCompany(company_desc)

        res.status(201).json({id:id})
    }

    async updateCompany(req: Request, res: Response) {
        const { companyId } = req.params
        const { company_desc} = req.body

        const updatedCompany = await this.companyRepository.updateCompanyById(
            parseInt(companyId),
            company_desc
        );

        if (!updatedCompany) {
            res.status(404).json({ error: "company not found" });
        }

        res.status(200).json(updatedCompany);
    }

    async deleteCompany(req: Request, res: Response) {
        const { companyId } = req.params;

        const deletedCompany = await this.companyRepository.deleteCompanyById(parseInt(companyId));

        if (!deletedCompany) {
            res.status(404).json({ error: "company not found" });
        }

        res.status(200).json({ message: "company deleted successfully" });
    }
}