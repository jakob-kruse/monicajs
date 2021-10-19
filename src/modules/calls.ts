import { Got } from 'got';
import { MonicaDeletedResponse, MonicaResponse } from '../api/response';
import { applyPagination, MonicaPaginationOptionsAll } from '../pagination';

export class MonicaCallsModule {
  constructor(private http: Got) {}

  /** List all the calls in your account */
  async mine({ pagination }: MonicaPaginationOptionsAll = {}) {
    const response = await this.http
      .get('calls', {
        searchParams: applyPagination(pagination),
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Get a specific call */
  async get({ id }: { id: number }) {
    const response = await this.http.get(`calls/${id}`).json<MonicaResponse>();

    return response.data;
  }

  /** Create a call */
  async create({ call }: { call: any }) {
    const response = await this.http
      .post('calls', {
        json: call,
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Update a call */
  async update({ id, call }: { id: number; call: any }) {
    const response = await this.http
      .put(`calls/${id}`, {
        json: call,
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Delete a call */
  async delete({ id }: { id: number }) {
    return this.http.delete(`calls/${id}`).json<MonicaDeletedResponse>();
  }
}
