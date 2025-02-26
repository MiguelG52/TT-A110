import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, BelongsTo } from "sequelize-typescript";
import  User  from "./user.model";
import  Group  from "./group.model";

@Table({
  tableName: "UserGroup",
})
 class UserGroup extends Model {
  

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;



  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER })
  groupId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Group)
  group!: Group;

}
export default UserGroup;