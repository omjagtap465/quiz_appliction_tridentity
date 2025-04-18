import dotenv from 'dotenv';
dotenv.config();
// import { loadConfig } from "./config/config.js";
// import dbConfig from './config/config.js';


import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import cors from 'cors';
import { companyApis } from './routes/company/company_api.js';
import { connectorApis } from './routes/connector/connector_api.js';
import { modelRoutes } from './routes/modelCrud/model.js';
import { sequelize, startConnection } from './sequelize.js';

import moment from 'moment';
import { CronJob } from 'cron';

const init = async () => {
  console.log(`process.env.NODE_ENV?`, process.env.NODE_ENV);
  // const envConfig = loadConfig(process.env.NODE_ENV);

  startConnection();
  // const [results, metadata] = await sequelize.query('SELECT * from accounts');
  // console.log(`results?`, results);

  const app = express();
  app.use(express.static('client'));
  app.use(cors({ origin: '*' }));
  app.use(
    morgan('combined', {
      skip: function (req, res) {
        return res.statusCode < 400;
      },
    })
  );

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(    
    bodyParser.json({
      limit: '300mb',
    })
  );

  app.use(companyApis);
  app.use(connectorApis);
  app.use(modelRoutes);
  app.listen(process.env.COMPANY_PORT, () => {
    console.log(
      `COMPANY START:: Listening on COMPANY_PORT ${process.env.COMPANY_PORT}!`
    );
    console.log(
      `COMPANY UserName:: ENV MODE ${JSON.stringify(process.env.DB_PASSWORD)}!`
    );
    console.log(
      `COMPANY PAssword:: ENV MODE ${JSON.stringify(process.env.NODE_ENV)}!`
    );
    console.log(
      `COMPANY START:: ENV MODE ${JSON.stringify(process.env.DB_USERNAME)}!`
    );
    //load config
  });

  // const job = new CronJob('* * * * *', function () {
  //   console.log('Running cron', new Date());
  //   // AutomationManager.scheduledAutomationMessage();
  // });
  // job.start();
};
init();
