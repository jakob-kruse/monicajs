import { Got } from 'got';
import { applyPagination, MonicaPaginationOptionsAll } from '../pagination';
import { MonicaDeletedResponse, MonicaResponse } from '../api/response';

/**
 * When adding an activity done with a contact, you can associate it with a type of activity. This
 * is useful to categorize your activities done with your contacts.
 *
 * An activity type belongs to an activity type categories.
 *
 * By default, each account comes with a set of predefined activity type categories.
 */
export class MonicaActivityTypeCategoriesModule {
  constructor(private readonly http: Got) {}

  /** List all the activity type categories in your account */
  async mine({ pagination }: MonicaPaginationOptionsAll = {}) {
    const response = await this.http
      .get(`activitytypecategories`, {
        searchParams: applyPagination(pagination),
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Get a specific activity type category */
  async get({ id }: { id: number }) {
    const response = await this.http.get(`activitytypecategories/${id}`).json<MonicaResponse>();

    return response.data;
  }

  /** Create an activity type category */
  async create({ create }: { create: any }) {
    const response = await this.http
      .post(`activitytypecategories`, { json: create })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Update an activity type category */
  async update({ id, update }: { id: number; update: any }) {
    const response = await this.http
      .put(`activitytypecategories/${id}`, { json: update })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Delete an activity type category */
  async delete({ id }: { id: number }) {
    return this.http.delete(`activitytypecategories/${id}`).json<MonicaDeletedResponse>();
  }
}
