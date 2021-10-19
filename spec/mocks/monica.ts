import { ExtendOptions } from 'got/dist/source';
import process from 'process';
import { Monica } from '../../src/monica';

export function createMonicaMock(http: ExtendOptions = {}) {
  const { MONICA_URL: url = 'http://monica.test', MONICA_TOKEN: token = 'test-token' } =
    process.env;

  return new Monica({
    url,
    token,
    http,
  });
}
