import nock from 'nock';
import { createMonicaMock } from './monica';

export function createNockMock() {
  const monicaMock = createMonicaMock();

  nock.disableNetConnect();

  return nock(monicaMock.config.url);
}
