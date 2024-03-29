import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  HasOne,
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

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare start_date: Date;

  @Column({ allowNull: false })
  declare end_date: Date;

  @Column({ allowNull: false })
  declare active: boolean;

  @Column({ allowNull: false })
  declare createdAt: Date;

  @Column({ allowNull: false })
  declare updatedAt: Date;
}
