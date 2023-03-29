import 'reflect-metadata';
import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import TeacherPhoneNumbersModel from '../teacher/sequelize/models/teacher-phone-numbers.model';
import TeacherModel from '../teacher/sequelize/models/teacher.model';
import UserAdminModel from '../user-admin/sequelize/model/user-admin.model';
import { router } from './routes';

import '../@shared/container';

import StudentsModel from '../students/sequelize/models/students.model';

export const app: Express = express();

app.use(express.json());
app.use('/api', router);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    sync: { force: true },
  });

  sequelize.addModels([
    UserAdminModel,
    TeacherModel,
    TeacherPhoneNumbersModel,
    StudentsModel,
  ]);
  await sequelize.sync();
}

setupDb();
