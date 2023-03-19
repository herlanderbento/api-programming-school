import {
  Model,
  PrimaryKey,
  Column,
  Table,
  DataType,
} from 'sequelize-typescript';
import Id from '../../../../domain/@shared/value-object/id.value-object';
import UserAdmin from '../../../../domain/user-admin/entity/user-admin';

@Table({
  tableName: 'user_admin',
  timestamps: false,
})
export default class UserAdminModel extends Model {
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
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}
