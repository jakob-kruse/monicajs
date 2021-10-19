export class MonicaApiError extends Error {
  static readonly errors = {
    0: 'Unknown Error',

    30: 'The limit parameter is too big.',

    31: 'The resource has not been found.',

    32: 'Error while trying to save the data.',

    33: 'Too many parameters.',

    34: 'Too many attempts, please slow down the request.',

    35: 'This email address is already taken.',

    36: "You can't set a partner or a child to a partial contact.",

    37: 'Problems parsing JSON.',

    38: 'Date should be in the future.',

    39: 'The sorting criteria is invalid.',

    40: 'Invalid query.',

    41: 'Invalid parameters.',
  };

  static toResponse(type: MonicaErrorCode) {
    return {
      error: {
        code: type,
        message: MonicaApiError.errors[type],
      },
    };
  }

  static fromStatusCode(statusCode: number, message?: string) {
    let monicaCode: MonicaErrorCode = 0;

    switch (statusCode) {
      case 404:
        monicaCode = 31;
        break;
      case 422:
        monicaCode = 32;
        break;
      default:
        monicaCode = 0;
    }

    return new this(monicaCode, message);
  }

  constructor(readonly code: MonicaErrorCode, message?: string) {
    super(`[${code}] "${MonicaApiError.errors[code] + (message ? ` "${message}"` : '')}"`);
  }
}

export type MonicaErrorCode = keyof typeof MonicaApiError.errors;
