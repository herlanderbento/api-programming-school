import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import UserAdminModel from '../user-admin/sequelize/model/user-admin.model';
import { router } from './routes';

export const app: Express = express();

app.use(express.json());
app.use(router);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });

  sequelize.addModels([UserAdminModel]);
  await sequelize.sync();
}

setupDb();
