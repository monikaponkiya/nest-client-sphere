import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Companies } from "./entity/company.entity";
import { Repository } from "typeorm";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { CustomError } from "src/common/helpers/exceptions";
import { COMPANY_RESPONSE_MESSAGES } from "src/common/constants/response.constant";
import { ListDto } from "src/common/dto/common.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Companies)
    private readonly companyRepository: Repository<Companies>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      if (await this.getCompanyByEmail(createCompanyDto.email)) {
        throw CustomError(
          COMPANY_RESPONSE_MESSAGES.COMPANY_ALREADY_EXISTS,
          HttpStatus.BAD_REQUEST,
        );
      }

      const company = this.companyRepository.create(createCompanyDto);
      const createdCompany = await this.companyRepository.save(company);
      return createdCompany;
    } catch (error) {
      throw CustomError(error.message, error.statusCode);
    }
  }

  async findAll(params: ListDto) {
    try {
      const queryBuilder = this.companyRepository.createQueryBuilder("company");

      // Apply search filter if the search term is provided
      if (params.search) {
        queryBuilder.where("company.name ILIKE :search", {
          search: `%${params.search}%`,
        });
      }

      const totalQuery = queryBuilder.clone();

      // Apply pagination if page and limit are provided
      if (params.offset !== undefined && params.limit) {
        queryBuilder.skip(params.offset).take(params.limit);
      }

      // Apply sorting if sort and sortBy are provided
      if (params.sortOrder && params.sortBy) {
        queryBuilder.orderBy(
          `company.${params.sortBy}`,
          params.sortOrder === "asc" ? "ASC" : "DESC",
        );
      } else {
        queryBuilder.orderBy("company.createdAt", "DESC");
      }

      queryBuilder
        .leftJoinAndSelect("company.projects", "project")
        .leftJoinAndSelect("company.country", "country");
      const companies = await queryBuilder.getMany();
      // Get the total count based on the original query
      const recordsTotal = await totalQuery.getCount();
      return {
        result: companies,
        recordsTotal,
      };
    } catch (error) {
      throw CustomError(error.message, error.statusCode);
    }
  }

  async findOne(id: number) {
    try {
      const company = await this.companyRepository.findOneBy({ id });
      if (!company) {
        throw CustomError(
          COMPANY_RESPONSE_MESSAGES.COMPANY_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
      const queryBuilder = this.companyRepository.createQueryBuilder("company");
      return await queryBuilder
        .leftJoinAndSelect("company.projects", "project")
        .leftJoinAndSelect("company.country", "country")
        .where({ id })
        .getOne();
    } catch (error) {
      throw CustomError(error.message, error.statusCode);
    }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      const company = await this.companyRepository.findOneBy({ id });
      if (!company) {
        throw CustomError(
          COMPANY_RESPONSE_MESSAGES.COMPANY_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
      return await this.companyRepository.update(id, updateCompanyDto);
    } catch (error) {
      throw CustomError(error.message, error.statusCode);
    }
  }

  async remove(id: number) {
    try {
      const company = await this.companyRepository.findOneBy({ id });
      if (!company) {
        throw CustomError(
          COMPANY_RESPONSE_MESSAGES.COMPANY_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
      return await this.companyRepository.delete(id);
    } catch (error) {
      throw CustomError(error.message, error.statusCode);
    }
  }

  async getCompanyByEmail(email: string) {
    return await this.companyRepository.findOneBy({ email });
  }
}
