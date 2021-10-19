import { Got } from 'got';
import { MonicaResponse } from '../api/response';
import { applyPagination, MonicaPaginationOptionsAll } from '../pagination';

/**
 * The Audit log object represents what happened in the account. An audit log can be about a user, a
 * contact or else. Right now, only audit logs about contacts are supported.
 */
export class MonicaLogsModule {
  constructor(private readonly http: Got) {}

  /** List all the audit logs in the account */
  async mine({ pagination }: MonicaPaginationOptionsAll = {}) {
    const response = await this.http
      .get('logs', {
        searchParams: applyPagination(pagination),
      })
      .json<MonicaResponse>();

    return response.data;
  }
}
