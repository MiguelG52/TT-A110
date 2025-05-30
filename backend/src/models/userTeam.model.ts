import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, BelongsTo } from "sequelize-typescript";
import  User  from "./user.model";
import  Team  from "./team.model";

@Table({
  tableName: "UserTeam",
  timestamps: true,
})
 class UserTeam extends Model {
  

  @ForeignKey(() => Team)
  @Column({ type: DataType.INTEGER })
  teamId!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId!: number;

  @BelongsTo(() => Team)
  team!: Team;

  @BelongsTo(() => User, { as: 'user' })
  user!: User;
  
}
export default UserTeam;