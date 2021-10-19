import { Got } from 'got';
import { applyPagination, MonicaPagination, MonicaPaginationOptionsID } from '../pagination';
import { MonicaDeletedResponse, MonicaResponse } from '../api/response';

export type MonicaSorting = 'created_at' | '-created_at' | 'updated_at' | '-updated_at';

export class MonicaContactsModule {
  constructor(private readonly http: Got) {}

  /** List all your contacts */
  async mine({
    pagination,
    query,
    sort = 'created_at',
  }: {
    pagination?: MonicaPagination;
    query?: string;
    sort?: MonicaSorting;
  } = {}) {
    const response = await this.http
      .get('contacts', {
        searchParams: {
          query,
          sort,
          ...applyPagination(pagination),
        },
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Get a specific contact */
  async get({ id, contactFields = false }: { id: number; contactFields?: boolean }) {
    const params = contactFields ? { with: 'contactfields' } : {};

    const response = await this.http
      .get(`contacts/${id}`, {
        searchParams: params,
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Get the audit logs for the specific contact */
  async logs({ id, pagination = {} }: MonicaPaginationOptionsID) {
    const response = await this.http
      .get(`contacts/${id}/logs`, {
        searchParams: applyPagination(pagination),
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** List all the addresses of the specific contact */
  async addresses({ id, pagination = {} }: MonicaPaginationOptionsID) {
    const response = await this.http
      .get(`contacts/${id}/addresses`, {
        searchParams: applyPagination(pagination),
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** List all the contacts for the given tag */
  async tag({ id, pagination = {} }: MonicaPaginationOptionsID) {
    const response = await this.http
      .get(`tags/${id}/contacts`, {
        searchParams: applyPagination(pagination),
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** List all the activities of the specific contact */
  async activities({ id, pagination = {} }: MonicaPaginationOptionsID) {
    const response = await this.http
      .get(`contacts/${id}/activities`, {
        searchParams: applyPagination(pagination),
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** List all the calls of a specific contact */
  async calls({ id, pagination }: MonicaPaginationOptionsID) {
    const response = await this.http
      .get(`contacts/${id}/calls`, {
        searchParams: applyPagination(pagination),
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Update a contact career */
  async updateCareer({ id, career }: { id: number; career: any }) {
    const response = await this.http
      .put(`contacts/${id}/work`, {
        json: career,
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Update a contact */
  async update({ id, contact }: { id: number; contact: any }) {
    const response = await this.http
      .put(`contacts/${id}`, {
        json: contact,
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Create a contact */
  async create({ contact }: { contact: any }) {
    const response = await this.http
      .post('contacts', {
        json: contact,
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Delete a contact */
  async delete({ id }: { id: number }) {
    return this.http.delete(`contacts/${id}`).json<MonicaDeletedResponse>();
  }
}
