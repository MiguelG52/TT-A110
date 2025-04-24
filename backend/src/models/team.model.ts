import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany, AllowNull } from "sequelize-typescript";
import  User  from "./user.model";
import  UserTeam  from "./userTeam.model";
import  Project  from "./project.model";
import  TeamProject  from "./teamProject.model";
import { BelongsToMany } from "sequelize-typescript";

@Table({
  tableName: "Team",
  timestamps: true,
})
class Team extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  teamId!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;
  
  @Column({
    type: DataType.STRING(8),
    allowNull:false,
  })
  teamCodeId!: string


  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => UserTeam, { as: 'members' })
  userTeams!: UserTeam[];

  @BelongsToMany(() => Project, () => TeamProject)
  projects!: Project[];

}

export default Team;