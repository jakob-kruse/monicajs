import { Got } from 'got';
import { applyPagination, MonicaPaginationOptionsAll } from '../pagination';
import { MonicaDeletedResponse, MonicaResponse } from '../api/response';

/**
 * When adding an activity done with a contact, you can associate it with a type of activity. This
 * is useful to categorize your activities done with your contacts.
 *
 * An activity type also belongs to an activity type categories.
 *
 * By default, each account comes with a set of predefined activity types, like `Went to a
 * restaurant` or `Went to the theater`.
 */
export class MonicaActivityTypesModule {
  constructor(private readonly http: Got) {}

  /** List all the activity types in your account */
  async mine({ pagination }: MonicaPaginationOptionsAll = {}) {
    const response = await this.http
      .get('activitytypes', {
        searchParams: applyPagination(pagination),
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Get a specific activity type */
  async get({ id }: { id: number }) {
    const response = await this.http.get(`activitytypes/${id}`).json<MonicaResponse>();

    return response.data;
  }

  /** Create an activity type */
  async create({ activityType }: { activityType: any }) {
    const response = await this.http
      .post('activitytypes', {
        json: activityType,
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Update an activity type */
  async update({ id, activityType }: { id: number; activityType: any }) {
    const response = await this.http
      .put(`activitytypes/${id}`, {
        json: activityType,
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Update an activity type */
  async delete({ id }: { id: number }) {
    return this.http.delete(`activitytypes/${id}`).json<MonicaDeletedResponse>();
  }
}
