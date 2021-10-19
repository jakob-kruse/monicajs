import { Got } from 'got';
import { applyPagination, MonicaPaginationOptionsAll } from '../pagination';
import { MonicaDeletedResponse, MonicaResponse } from '../api/response';

/**
 * The Activity object represents activities made with one or more contacts. Use it to keep track of
 * what you've done. An activity can't be orphan - it needs to be linked to at least one contact.
 *
 * When retrieving an activity, we always also return some basic information about the related contact(s).
 */
export class MonicaActivitiesModule {
  constructor(private readonly http: Got) {}

  /** List all the activities in your account */
  async mine({ pagination }: MonicaPaginationOptionsAll = {}) {
    const response = await this.http
      .get(`activities`, { searchParams: applyPagination(pagination) })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Get a specific activity */
  async get({ id }: { id: number }) {
    const response = await this.http.get(`activities/${id}`).json<MonicaResponse>();

    return response.data;
  }

  /** Create an activity */
  async create({ activity }: { activity: any }) {
    const response = await this.http.post(`activities`, { json: activity }).json<MonicaResponse>();

    return response.data;
  }

  /** Update an activity */
  async update({ id, activity }: { id: number; activity: any }) {
    const response = await this.http
      .put(`activities/${id}`, { json: activity })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Delete an activity */
  async delete({ id }: { id: number }) {
    return this.http.delete(`activities/${id}`).json<MonicaDeletedResponse>();
  }
}
