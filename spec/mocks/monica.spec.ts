/* eslint-disable jest/no-hooks */
import { createMonicaMock } from './monica';

const originalEnv = process.env;

describe('Monica Mock', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  test('createMonicaMock() - returns monica instance with defaults', () => {
    const monica = createMonicaMock();
    expect(monica).toBeDefined();

    const { config } = monica;
    expect(config).toBeDefined();

    expect(config.url).toBe('http://monica.test');
    expect(config.token).toBe('test-token');
  });

  test('createMonicaMock() - should read environment variable "MONICA_URL"', () => {
    process.env = {
      ...originalEnv,
      MONICA_URL: 'http://expected-url.com',
    };
    const monica = createMonicaMock();
    expect(monica).toBeDefined();

    expect(monica.config.url).toBe('http://expected-url.com');
  });

  test('createMonicaMock() - should read environment variable "MONICA_TOKEN"', () => {
    process.env = {
      ...originalEnv,
      MONICA_TOKEN: 'expected-token',
    };

    const monica = createMonicaMock();
    expect(monica).toBeDefined();

    expect(monica.config.token).toBe('expected-token');
  });
});
