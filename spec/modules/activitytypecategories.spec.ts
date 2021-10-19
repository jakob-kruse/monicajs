import { applyPagination } from '../../src/pagination';
import { createMonicaMock } from '../mocks/monica';
import { createNockMock } from '../mocks/nock';

describe('MonicaActivityTypeCategoriesModule', () => {
  test('mine()', async () => {
    expect.assertions(1);
    const monica = createMonicaMock();

    const expected = {
      response: { data: [{ fetched: true }] },
    };

    const scope = createNockMock()
      .get('/activitytypecategories')
      .query(applyPagination())
      .reply(200, expected.response);

    const actual = await monica.activityTypeCategories.mine();

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('mine() - with pagination', async () => {
    expect.assertions(1);
    const monica = createMonicaMock();

    const expected = {
      pagination: { page: 9, limit: 8 },
      response: { data: [{ fetched: true }] },
    };

    const scope = createNockMock()
      .get('/activitytypecategories')
      .query(applyPagination(expected.pagination))
      .reply(200, expected.response);

    const actual = await monica.activityTypeCategories.mine({ pagination: expected.pagination });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('get()', async () => {
    expect.assertions(1);
    const monica = createMonicaMock();
    const expected = {
      id: 187,
      response: { data: { fetched: true } },
    };

    const scope = createNockMock()
      .get(`/activitytypecategories/${expected.id}`)
      .reply(200, expected.response);

    const actual = await monica.activityTypeCategories.get({ id: expected.id });

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
      .post('/activitytypecategories', expected.create)
      .reply(200, expected.response);

    const actual = await monica.activityTypeCategories.create({
      create: expected.create,
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
      .put(`/activitytypecategories/${expected.id}`, expected.update)
      .reply(200, expected.response);

    const actual = await monica.activityTypeCategories.update({
      id: expected.id,
      update: expected.update,
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
      .delete(`/activitytypecategories/${expected.id}`)
      .reply(200, expected.response);

    const actual = await monica.activityTypeCategories.delete({
      id: expected.id,
    });

    expect(actual).toStrictEqual(expected.response);

    scope.done();
  });
});
