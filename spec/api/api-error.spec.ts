import { MonicaErrorCode, MonicaApiError } from '../../src/api/api-error';

const errorMapping: {
  http_code: number;
  code: MonicaErrorCode;
  message: string;
}[] = [
  {
    http_code: -1,
    code: 0,
    message: 'Unknown Error',
  },
  {
    http_code: 404,
    code: 31,
    message: 'The resource has not been found',
  },
  {
    http_code: 422,
    code: 32,
    message: 'Error while trying to save the data.',
  },
];

describe('api Error', () => {
  describe('fromStatusCode', () => {
    // eslint-disable-next-line jest/require-hook
    errorMapping.forEach(({ http_code, code, message }) => {
      it(`should convert http error code ${http_code} to monica code ${code} with message: "${message}"`, () => {
        const error = MonicaApiError.fromStatusCode(http_code);

        expect(error.message).toContain(message);
        expect(error.code).toStrictEqual(code);
      });
    });

    describe('toResponse', () => {
      // eslint-disable-next-line jest/require-hook
      errorMapping.forEach(({ code, message }) => {
        it(`should create a correct error response for monica code ${code} with message ${message}`, () => {
          const { error } = MonicaApiError.toResponse(code);

          expect(error.code).toStrictEqual(code);
          expect(error.message).toContain(message);
        });
      });
    });
  });
});
