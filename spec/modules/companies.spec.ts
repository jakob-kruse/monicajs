import { applyPagination } from '../../src/pagination';
import { createMonicaMock } from '../mocks/monica';
import { createNockMock } from '../mocks/nock';

describe('MonicaCompaniesModule', () => {
  test('mine()', async () => {
    expect.assertions(1);
    const monica = createMonicaMock();
    const expected = {
      response: {
        data: [{ fetched: true }],
      },
    };

    const scope = createNockMock()
      .get('/companies')
      .query(applyPagination())
      .reply(200, expected.response);

    const actual = await monica.companies.mine();

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('mine() - with pagination', async () => {
    expect.assertions(1);
    const monica = createMonicaMock();
    const expected = {
      pagination: { page: 4, limit: 12 },
      response: {
        data: [{ fetched: true }],
      },
    };

    const scope = createNockMock()
      .get('/companies')
      .query(applyPagination(expected.pagination))
      .reply(200, expected.response);

    const actual = await monica.companies.mine({ pagination: expected.pagination });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('get()', async () => {
    expect.assertions(1);
    const monica = createMonicaMock();
    const expected = {
      id: 187,
      response: { data: [{ fetched: true }] },
    };

    const scope = createNockMock()
      .get(`/companies/${expected.id}`)
      .query(applyPagination())
      .reply(200, expected.response);

    const actual = await monica.companies.get({ id: expected.id });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('create()', async () => {
    expect.assertions(1);
    const monica = createMonicaMock();
    const expected = {
      create: {
        created: true,
      },
      response: { data: [{ created: true }] },
    };

    const scope = createNockMock().post('/companies').reply(200, expected.response);

    const actual = await monica.companies.create({ company: expected.create });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('update()', async () => {
    expect.assertions(1);
    const monica = createMonicaMock();
    const expected = {
      id: 187,
      update: {
        updated: true,
      },
      response: { data: [{ updated: true }] },
    };

    const scope = createNockMock().put(`/companies/${expected.id}`).reply(200, expected.response);

    const actual = await monica.companies.update({ id: expected.id, company: expected.update });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('delete()', async () => {
    expect.assertions(1);
    const monica = createMonicaMock();
    const expected = {
      id: 187,
      response: { data: [{ deleted: true }] },
    };

    const scope = createNockMock()
      .delete(`/companies/${expected.id}`)
      .reply(200, expected.response);

    const actual = await monica.companies.delete({ id: expected.id });

    expect(actual).toStrictEqual(expected.response);

    scope.done();
  });
});
