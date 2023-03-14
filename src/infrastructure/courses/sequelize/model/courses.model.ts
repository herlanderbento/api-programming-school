import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import TeacherModel from '../../../teacher/sequelize/models/teacher.model';

@Table({
  tableName: 'courses',
  timestamps: false,
})
export default class CoursesModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => TeacherModel)
  @Column({ allowNull: false })
  declare teacher_id: string;

  @BelongsTo(() => TeacherModel)
  declare teacher: TeacherModel;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare start_date: Date;

  @Column({ allowNull: false })
  declare end_date: Date;

  @Column({ allowNull: false })
  declare active: boolean;
}
