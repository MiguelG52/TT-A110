import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from "sequelize-typescript";
import UserGroup from "./userGroup.model";

@Table({
  tableName: "Group",
  timestamps: true,
})
 class Group extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER, allowNull: false })
  groupId!: number;

  
  @HasMany(() => UserGroup)
  userGroups!: UserGroup[];

  }

export default Group;