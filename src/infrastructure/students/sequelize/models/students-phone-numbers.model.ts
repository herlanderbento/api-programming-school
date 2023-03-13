import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import StudentsModel from './students.model';

@Table({
  tableName: 'students_phone_numbers',
  timestamps: false,
})

export default class StudentsPhoneNumbersModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => StudentsModel)
  @Column({ allowNull: false })
  declare student_id: string;

  @BelongsTo(() => StudentsModel)
  declare students: StudentsModel;

  @Column({ allowNull: false })
  declare phone: string;
}
