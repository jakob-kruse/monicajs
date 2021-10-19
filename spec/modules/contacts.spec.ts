import { MonicaSorting } from '../../src/modules/contacts';
import { applyPagination } from '../../src/pagination';
import { createMonicaMock } from '../mocks/monica';
import { createNockMock } from '../mocks/nock';

describe('MonicaContactsModule', () => {
  test('all()', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      response: { data: [{ fetched: true }] },
    };

    const scope = createNockMock()
      .get('/contacts')
      .query({ sort: 'created_at', ...applyPagination() })
      .reply(200, expected.response);

    const actual = await monica.contacts.mine();

    expect(actual).toStrictEqual(expected.response.data);
    scope.done();
  });

  test('all() - with pagination', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      pagination: { page: 23, limit: 9 },
      response: { data: [{ fetched: true }] },
    };

    const scope = createNockMock()
      .get('/contacts')
      .query({ sort: 'created_at', ...applyPagination(expected.pagination) })
      .reply(200, expected.response);

    const actual = await monica.contacts.mine({ pagination: expected.pagination });

    expect(actual).toStrictEqual(expected.response.data);
    scope.done();
  });

  test('all() - with sorting', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      sorting: '-created_at' as MonicaSorting,
      pagination: { page: 23, limit: 9 },
      response: { data: [{ fetched: true }] },
    };

    const scope = createNockMock()
      .get('/contacts')
      .query({ sort: expected.sorting, ...applyPagination(expected.pagination) })
      .reply(200, expected.response);

    const actual = await monica.contacts.mine({
      pagination: expected.pagination,
      sort: expected.sorting,
    });

    expect(actual).toStrictEqual(expected.response.data);
    scope.done();
  });

  test('all() - with query', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      query: 'test query',
      pagination: { page: 23, limit: 9 },
      response: { data: [{ fetched: true }] },
    };

    const scope = createNockMock()
      .get('/contacts')
      .query({ query: expected.query, sort: 'created_at', ...applyPagination(expected.pagination) })
      .reply(200, expected.response);

    const actual = await monica.contacts.mine({
      pagination: expected.pagination,
      query: expected.query,
    });

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
    const scope = createNockMock().get(`/contacts/${expected.id}`).reply(200, expected.response);

    const actual = await monica.contacts.get({ id: expected.id });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('get() - with contactfields', async () => {
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
      .get(`/contacts/${expected.id}`)
      .query({ with: 'contactfields' })
      .reply(200, expected.response);

    const actual = await monica.contacts.get({ id: expected.id, contactFields: true });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('addresses()', async () => {
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
    const scope = createNockMock()
      .get(`/contacts/${expected.id}/addresses`)
      .query(applyPagination())
      .reply(200, expected.response);

    const actual = await monica.contacts.addresses({
      id: expected.id,
    });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('addresses() - with pagination', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      id: 187,
      pagination: {
        page: 99,
        limit: 12,
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
      .get(`/contacts/${expected.id}/addresses`)
      .query(applyPagination(expected.pagination))
      .reply(200, expected.response);

    const actual = await monica.contacts.addresses({
      id: expected.id,
      pagination: expected.pagination,
    });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('logs()', async () => {
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

    const scope = createNockMock()
      .get(`/contacts/${expected.id}/logs`)
      .query(applyPagination())
      .reply(200, expected.response);

    const actual = await monica.contacts.logs({ id: expected.id });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('logs() - with pagination', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      id: 187,
      pagination: {
        page: 1,
        limit: 66,
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
      .get(`/contacts/${expected.id}/logs`)
      .query(applyPagination(expected.pagination))
      .reply(200, expected.response);

    const actual = await monica.contacts.logs({ id: expected.id, pagination: expected.pagination });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('tag()', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      id: 187,
      response: {
        data: [{ fetched: true }],
      },
    };
    const scope = createNockMock()
      .get(`/tags/${expected.id}/contacts`)
      .query(applyPagination())
      .reply(200, expected.response);

    const actual = await monica.contacts.tag({ id: expected.id });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('tag() - with pagination', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      id: 187,
      pagination: { page: 5, limit: 12 },
      response: {
        data: [{ fetched: true }],
      },
    };
    const scope = createNockMock()
      .get(`/tags/${expected.id}/contacts`)
      .query(applyPagination(expected.pagination))
      .reply(200, expected.response);

    const actual = await monica.contacts.tag({ id: expected.id, pagination: expected.pagination });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('activities()', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      id: 187,
      response: {
        data: [{ fetched: true }],
      },
    };
    const scope = createNockMock()
      .get(`/contacts/${expected.id}/activities`)
      .query(applyPagination())
      .reply(200, expected.response);

    const actual = await monica.contacts.activities({ id: expected.id });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('activities() - with pagination', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      id: 187,
      pagination: { page: 2, limit: 1 },
      response: {
        data: [{ fetched: true }],
      },
    };
    const scope = createNockMock()
      .get(`/contacts/${expected.id}/activities`)
      .query(applyPagination(expected.pagination))
      .reply(200, expected.response);

    const actual = await monica.contacts.activities({
      id: expected.id,
      pagination: expected.pagination,
    });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('calls()', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      id: 187,
      response: {
        data: [{ fetched: true }],
      },
    };
    const scope = createNockMock()
      .get(`/contacts/${expected.id}/calls`)
      .query(applyPagination())
      .reply(200, expected.response);

    const actual = await monica.contacts.calls({ id: expected.id });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('calls() - with pagination', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      id: 187,
      pagination: { page: 2, limit: 1 },
      response: {
        data: [{ fetched: true }],
      },
    };
    const scope = createNockMock()
      .get(`/contacts/${expected.id}/calls`)
      .query(applyPagination(expected.pagination))
      .reply(200, expected.response);

    const actual = await monica.contacts.calls({
      id: expected.id,
      pagination: expected.pagination,
    });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('updateCareer()', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      id: 187,
      career: {
        job: 'QA',
        company: 'test',
      },
      response: {
        data: {
          test: true,
        },
      },
    };
    const scope = createNockMock()
      .put(`/contacts/${expected.id}/work`, expected.career)
      .reply(200, expected.response);

    const actual = await monica.contacts.updateCareer({
      id: expected.id,
      career: expected.career,
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
        first_name: 'test',
        gender_id: 187,
        is_birthdate_known: false,
        is_deceased: false,
        is_deceased_date_known: false,
      },
      response: { data: { updated: true } },
    };
    const scope = createNockMock()
      .put(`/contacts/${expected.id}`, expected.update)
      .reply(200, expected.response);

    const result = await monica.contacts.update({
      id: expected.id,
      contact: expected.update,
    });

    expect(result).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('create()', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      response: { data: { created: true } },
      create: {
        first_name: 'John',
        gender_id: 187,
        is_birthdate_known: false,
        is_deceased: false,
        is_deceased_date_known: false,
      },
    };

    const scope = createNockMock().post('/contacts', expected.create).reply(200, expected.response);

    const actual = await monica.contacts.create({
      contact: expected.create,
    });

    expect(actual).toStrictEqual(expected.response.data);

    scope.done();
  });

  test('delete()', async () => {
    expect.assertions(1);

    const monica = createMonicaMock();

    const expected = {
      id: 187,
      response: { deleted: true },
    };
    const scope = createNockMock().delete(`/contacts/${expected.id}`).reply(200, expected.response);

    const actual = await monica.contacts.delete({ id: expected.id });

    expect(actual).toStrictEqual(expected.response);

    scope.done();
  });
});
