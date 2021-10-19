import { Got } from 'got';
import { MonicaResponse } from '../api/response';
import {
  applyPagination,
  MonicaPaginationOptionsAll,
  MonicaPaginationOptionsID,
} from '../pagination';

/** The Company object represents a company a Contact works (or worked) at. */
export class MonicaCompaniesModule {
  constructor(private readonly http: Got) {}

  /** List all the companies in your account */
  async mine({ pagination }: MonicaPaginationOptionsAll = {}) {
    const response = await this.http
      .get('companies', {
        searchParams: applyPagination(pagination),
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Get a specific company */
  async get({ id, pagination = {} }: MonicaPaginationOptionsID) {
    const response = await this.http
      .get(`companies/${id}`, {
        searchParams: applyPagination(pagination),
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Create a company */
  async create({ company }: { company: any }) {
    const response = await this.http
      .post('companies', {
        json: company,
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Update a company */
  async update({ id, company }: { id: number; company: any }) {
    const response = await this.http
      .put(`companies/${id}`, {
        json: company,
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Delete a company */
  async delete({ id }: { id: number }) {
    return this.http.delete(`companies/${id}`).json<MonicaResponse>();
  }
}
