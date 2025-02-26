import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import  User  from "./user.model";
import Team from "./team.model";

@Table({
  tableName: "Projects",
})
class Project extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  projectId!: number;

  
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @ForeignKey(() => Team)
  @Column({ type: DataType.INTEGER, allowNull: false })
  teamId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;


  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  originalCode!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  improveCode!: string;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Team)
  team!: Team;

  }
export default Project;