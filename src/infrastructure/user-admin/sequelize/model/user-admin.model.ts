import { Model, PrimaryKey, Column, Table } from 'sequelize-typescript';

@Table({
    tableName: "user_admin",
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

}
