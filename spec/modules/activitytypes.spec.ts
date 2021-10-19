import { applyPagination } from '../../src/pagination';
import { createMonicaMock } from '../mocks/monica';
import { createNockMock } from '../mocks/nock';

describe('MonicaActivityTypesModule', () => {
  test('mine()', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      response: {
        data: [
          {
            fetched: true,
          },
        ],
      },
    };

    const scope = createNockMock()
      .get('/activitytypes')
      .query(applyPagination())
      .reply(200, expected.response);

    const actual = await monica.activityTypes.mine();

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('mine() - with pagination', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      pagination: {
        page: 9,
        limit: 99,
      },
      response: {
        data: [
          {
            fetched: true,
          },
        ],
      },
    };

    const scope = createNockMock()
      .get('/activitytypes')
      .query(applyPagination(expected.pagination))
      .reply(200, expected.response);

    const actual = await monica.activityTypes.mine({ pagination: expected.pagination });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('get()', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      id: 187,
      response: {
        data: {
          fetched: true,
        },
      },
    };

    const scope = createNockMock()
      .get(`/activitytypes/${expected.id}`)
      .reply(200, expected.response);

    const actual = await monica.activityTypes.get({
      id: expected.id,
    });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('create()', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      create: { newActivity: true },
      response: { data: { created: true } },
    };

    const scope = createNockMock()
      .post('/activitytypes', expected.create)
      .reply(200, expected.response);

    const actual = await monica.activityTypes.create({
      activityType: expected.create,
    });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('update()', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      id: 187,
      update: { updatedActivity: true },
      response: { data: { updated: true } },
    };

    const scope = createNockMock()
      .put(`/activitytypes/${expected.id}`, expected.update)
      .reply(200, expected.response);

    const actual = await monica.activityTypes.update({
      id: expected.id,
      activityType: expected.update,
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
      .delete(`/activitytypes/${expected.id}`)
      .reply(200, expected.response);

    const actual = await monica.activityTypes.delete({
      id: expected.id,
    });

    expect(actual).toStrictEqual(expected.response);

    scope.done();
  });
});
