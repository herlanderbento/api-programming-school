import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import TeacherPhoneNumbersModel from './teacher-phone-numbers.model';

@Table({
  tableName: 'teachers',
  timestamps: false,
})
export default class TeacherModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare email: string;

  @Column({ allowNull: false })
  declare password: string;

  @Column({ allowNull: false })
  declare state: string;

  @Column({ allowNull: false })
  declare city: string;

  @Column({ allowNull: false })
  declare address: string;

  @HasMany(() => TeacherPhoneNumbersModel)
  declare phone_numbers: TeacherPhoneNumbersModel[];

  @Column({ allowNull: false })
  declare active: boolean;
}
