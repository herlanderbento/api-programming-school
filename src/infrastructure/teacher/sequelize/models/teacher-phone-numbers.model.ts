import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import TeacherModel from './teacher.model';

@Table({
  tableName: 'teacher_phone_numbers',
  timestamps: false,
})
export default class TeacherPhoneNumbersModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => TeacherModel)
  @Column({ allowNull: false })
  declare teacher_id: string;

  @BelongsTo(() => TeacherModel)
  declare teacher: TeacherModel;

  @Column({ allowNull: false })
  declare phone: string;
}
