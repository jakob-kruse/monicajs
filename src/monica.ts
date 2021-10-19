import got from 'got';
import type { Got, ExtendOptions } from 'got';
import { MonicaApiError } from './api/api-error';
import {
  MonicaActivityTypeCategoriesModule,
  MonicaActivityTypesModule,
  MonicaActivitiesModule,
  MonicaAddressesModule,
  MonicaContactsModule,
  MonicaCallsModule,
  MonicaLogsModule,
  MonicaCompaniesModule,
} from './modules';

/** Monica client configuration */
export type MonicaConfig = {
  /** Monica API base url */
  url: string;
  /** Monica API Token */
  token: string;
  /**
   * Used to overwrite
   * [got](https://github.com/sindresorhus/got/blob/main/documentation/10-instances.md#gotextendoptions-instances)
   * instance settings
   */
  http?: ExtendOptions;
};

/** The Main Monica class including all modules */
export class Monica {
  readonly client: Got;

  private readonly modules;

  constructor(private readonly monicaConfig: MonicaConfig) {
    this.client = this.createHttpClient();

    this.modules = {
      activityTypeCategories: new MonicaActivityTypeCategoriesModule(this.client),
      activityTypes: new MonicaActivityTypesModule(this.client),
      activities: new MonicaActivitiesModule(this.client),
      addresses: new MonicaAddressesModule(this.client),
      companies: new MonicaCompaniesModule(this.client),
      contacts: new MonicaContactsModule(this.client),
      calls: new MonicaCallsModule(this.client),
      logs: new MonicaLogsModule(this.client),
    };
  }

  private createHttpClient() {
    if (!this.monicaConfig.url) {
      throw new Error(`Invalid api url provided: "${this.monicaConfig.url}"`);
    }

    if (!this.monicaConfig.token) {
      throw new Error(`Invalid auth token provided: "${this.monicaConfig.token}"`);
    }

    return got.extend({
      prefixUrl: this.monicaConfig.url,
      headers: {
        authorization: `Bearer ${this.monicaConfig.token}`,
      },
      ...this.monicaConfig.http,
      hooks: {
        beforeError: [
          (error) => {
            const { response } = error;

            if (!response) {
              throw error;
            }

            if (!response.body) {
              throw new MonicaApiError(0, 'Response body is empty');
            }

            const responseBody = response.body as string;

            let errorMessage = response.statusMessage;

            try {
              const body = JSON.parse(responseBody);
              errorMessage = body.error.message;
            } catch {
              // do nothing
            }

            throw MonicaApiError.fromStatusCode(response.statusCode, errorMessage);
          },
        ],
      },
    });
  }

  /** The current monica config */
  get config(): MonicaConfig {
    return { ...this.monicaConfig };
  }

  get contacts(): MonicaContactsModule {
    return this.modules.contacts;
  }

  get activities(): MonicaActivitiesModule {
    return this.modules.activities;
  }

  get activityTypes() {
    return this.modules.activityTypes;
  }

  get activityTypeCategories() {
    return this.modules.activityTypeCategories;
  }

  get addresses() {
    return this.modules.addresses;
  }

  get logs() {
    return this.modules.logs;
  }

  get companies() {
    return this.modules.companies;
  }

  get calls() {
    return this.modules.calls;
  }
}

export default Monica;
