import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, BelongsToMany, AllowNull } from "sequelize-typescript";
import  User  from "./user.model";
import Team from "./team.model";
import TeamProject from "./teamProject.model";

@Table({
  tableName: "Projects",
  timestamps: true,
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

  @Column({
    type: DataType.STRING,
    allowNull:false,
  })
  name!:string

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

  @BelongsToMany(() => Team, () => TeamProject)
  teams!: Team[];

  }
export default Project;