import { Got } from 'got';
import { MonicaDeletedResponse, MonicaResponse } from '../api/response';

/**
 * The Address object represents an address of a contact. A contact can have as many addresses as
 * necessary. An address can't be orphan - it needs to be linked to at least one contact.
 *
 * When retrieving an address, we always also return some basic information about the related contact(s).
 */
export class MonicaAddressesModule {
  constructor(private readonly http: Got) {}

  /** Get a specific address */
  async get({ id }: { id: number }) {
    const response = await this.http.get(`addresses/${id}`).json<MonicaResponse>();

    return response.data;
  }

  /** Create an address */
  async create({ address }: { address: any }) {
    const response = await this.http
      .post('addresses', {
        json: address,
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Update an address */
  async update({ id, address }: { id: number; address: any }) {
    const response = await this.http
      .put(`addresses/${id}`, {
        json: address,
      })
      .json<MonicaResponse>();

    return response.data;
  }

  /** Delete an address */
  async delete({ id }: { id: number }) {
    return this.http.delete(`addresses/${id}`).json<MonicaDeletedResponse>();
  }
}
