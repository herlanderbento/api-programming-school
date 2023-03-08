import { Table, Model, PrimaryKey, Column } from 'sequelize-typescript';

@Table({
  tableName: 'teacher',
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

  @Column({ allowNull: false })
  declare phone: string;

  @Column({ allowNull: false })
  declare active: boolean;
}
