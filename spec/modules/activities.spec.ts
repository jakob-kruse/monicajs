import { applyPagination } from '../../src/pagination';
import { createMonicaMock } from '../mocks/monica';
import { createNockMock } from '../mocks/nock';

describe('MonicaActivitiesModule', () => {
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
      .get('/activities')
      .query(applyPagination())
      .reply(200, expected.response);

    const actual = await monica.activities.mine();

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('mine() - with pagination', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      pagination: {
        page: 9,
        limit: 4,
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
      .get('/activities')
      .query(applyPagination(expected.pagination))
      .reply(200, expected.response);

    const actual = await monica.activities.mine({ pagination: expected.pagination });

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

    const scope = createNockMock().get(`/activities/${expected.id}`).reply(200, expected.response);

    const actual = await monica.activities.get({
      id: expected.id,
    });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('create()', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      create: {
        newActivity: true,
      },
      response: {
        data: {
          created: true,
        },
      },
    };

    const scope = createNockMock()
      .post('/activities', expected.create)
      .reply(200, expected.response);

    const actual = await monica.activities.create({
      activity: expected.create,
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
        updatedActivity: true,
      },
      response: {
        data: {
          updated: true,
        },
      },
    };

    const scope = createNockMock()
      .put(`/activities/${expected.id}`, expected.update)
      .reply(200, expected.response);

    const actual = await monica.activities.update({
      id: expected.id,
      activity: expected.update,
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
      .delete(`/activities/${expected.id}`)
      .reply(200, expected.response);

    const actual = await monica.activities.delete({
      id: expected.id,
    });

    expect(actual).toStrictEqual(expected.response);

    scope.done();
  });
});
