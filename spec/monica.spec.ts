import { RequestError } from 'got/dist/source';
import { Monica, MonicaConfig } from '../src';
import { createMonicaMock } from './mocks/monica';
import { createNockMock } from './mocks/nock';

describe('monica module', () => {
  describe('initialisation', () => {
    test('should be defined', () => {
      const monica = new Monica({
        url: 'https://monica.test/api',
        token: 'test',
      });

      expect(monica).toBeDefined();
    });

    test('should throw without auth token', () => {
      expect(
        () =>
          new Monica({
            url: 'https://monica.test/api',
            token: '',
          }),
      ).toThrow('Invalid auth token provided: ""');
    });

    test('should throw without auth api url', () => {
      expect(
        () =>
          new Monica({
            url: '',
            token: 'test-token',
          }),
      ).toThrow('Invalid api url provided: ""');
    });

    test('should not allow mutating the config', () => {
      const config: MonicaConfig = {
        url: 'https://test.test',
        token: 'test',
      };

      const monica = new Monica(config);

      monica.config.url = 'dasdas';

      expect(monica.config.url).toStrictEqual(config.url);
    });
  });

  test('should have a getter for all modules', () => {
    const monica = createMonicaMock();

    const expected: Array<keyof Monica> = [
      'activityTypeCategories',
      'activityTypes',
      'activities',
      'addresses',
      'contacts',
    ];

    expected.forEach((moduleName) => {
      expect(monica[moduleName]).toBeDefined();
    });
  });

  describe('http Client', () => {
    test('should default to response status if it has no error.message', async () => {
      expect.assertions(2);

      const monica = createMonicaMock();
      const scope = createNockMock().get('/404').reply(404, 'something strange');

      let error: RequestError;
      try {
        await monica.client.get('404');
      } catch (err) {
        error = err as RequestError;
      }

      expect(error!).toBeDefined();
      expect(error!.message).toContain('Not Found');

      scope.done();
    });

    test('should throw if the response body is empty', async () => {
      expect.assertions(2);

      const monica = createMonicaMock();

      const scope = createNockMock().get('/404').reply(404, '');

      let error: RequestError;

      try {
        await monica.client.get('404');
      } catch (err) {
        error = err as RequestError;
      }

      expect(error!).toBeDefined();
      expect(error!.message).toContain('Response body is empty');

      scope.done();
    });

    test('should parse the json response body and extract the error message', async () => {
      expect.assertions(2);

      const monica = createMonicaMock();

      const expected = {
        error: 'test-error',
      };
      const scope = createNockMock()
        .get('/404')
        .reply(
          404,
          JSON.stringify({
            error: { message: expected.error },
          }),
        );

      let error: RequestError;
      try {
        await monica.client.get('404');
      } catch (err) {
        error = err as RequestError;
      }

      expect(error!).toBeDefined();
      expect(error!.message).toContain(expected.error);
      scope.done();
    });
  });
});
