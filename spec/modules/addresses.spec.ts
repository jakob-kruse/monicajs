import { createMonicaMock } from '../mocks/monica';
import { createNockMock } from '../mocks/nock';

describe('MonicaAddressesModule', () => {
  test('get()', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      id: 187,
      response: {
        data: [
          {
            fetched: true,
          },
        ],
      },
    };

    const scope = createNockMock().get(`/addresses/${expected.id}`).reply(200, expected.response);

    const actual = await monica.addresses.get({ id: expected.id });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('create()', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      create: {
        newAddress: true,
      },
      response: {
        data: {
          created: true,
        },
      },
    };

    const scope = createNockMock()
      .post('/addresses', expected.create)
      .reply(200, expected.response);

    const actual = await monica.addresses.create({
      address: expected.create,
    });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('update()', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      id: 187,
      update: {
        updatedAddress: true,
      },
      response: {
        data: {
          updated: true,
        },
      },
    };

    const scope = createNockMock()
      .put(`/addresses/${expected.id}`, expected.update)
      .reply(200, expected.response);

    const actual = await monica.addresses.update({
      id: expected.id,
      address: expected.update,
    });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('delete()', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      id: 187,
      response: { id: 187, deleted: true },
    };

    const scope = createNockMock()
      .delete(`/addresses/${expected.id}`)
      .reply(200, expected.response);

    const actual = await monica.addresses.delete({
      id: expected.id,
    });

    expect(actual).toStrictEqual(expected.response);

    scope.done();
  });
});
