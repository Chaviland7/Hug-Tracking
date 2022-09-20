import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';

import { caseRouter } from './api/cases/caseRouter';
import { clientRouter } from './api/clients/clientRouter';
import { enumsRouter } from './api/enumRouter';
import { perpetratorRouter } from './api/perpetrators/perpetratorRouter';
import { staffRouter } from './api/staff/staffRouter';
import { connect } from './config';

(async () => {
  try {
    console.log('connecting')
    connect();
    console.log('connected')
  } catch (err) {
    console.log(err)
  }
  const app = express();

  // Automatically allow cross-origin requests
  app.use(cors({ origin: true }));

  app.get('/version', (req, res) => {
    res.send(process.env.GIT_TAG ? process.env.GIT_TAG : 'dev');
  });

  // Mount sub-routers for each API module
  app.use('/case', caseRouter);
  app.use('/client', clientRouter);
  app.use('/enum', enumsRouter);
  app.use('/perpetrator', perpetratorRouter);
  app.use('/staff', staffRouter);

  exports.app = functions.https.onRequest(app);
})();