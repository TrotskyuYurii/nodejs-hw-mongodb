import {setupServer} from './server.js';
import {initMongoConnection} from '../src/db/initMongoConnection.js';

// (async () => {
//     await initMongoConnection();
//     setupServer();
//   })();

await initMongoConnection();
setupServer();