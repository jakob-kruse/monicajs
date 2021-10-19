import { applyPagination } from '../../src/pagination';
import { createMonicaMock } from '../mocks/monica';
import { createNockMock } from '../mocks/nock';

describe('MonicaLogsModule', () => {
  test('mine()', async () => {
    expect.assertions(1);
    const monica = createMonicaMock();

    const expected = {
      response: { data: [{ fetched: true }] },
    };

    const scope = createNockMock()
      .get('/logs')
      .query(applyPagination())
      .reply(200, expected.response);

    const actual = await monica.logs.mine();

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('mine() - with pagination', async () => {
    expect.assertions(1);
    const monica = createMonicaMock();

    const expected = {
      pagination: { page: 12, limit: 99 },
      response: { data: [{ fetched: true }] },
    };

    const scope = createNockMock()
      .get('/logs')
      .query(applyPagination(expected.pagination))
      .reply(200, expected.response);

    const actual = await monica.logs.mine({ pagination: expected.pagination });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });
});
