import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, BelongsTo } from "sequelize-typescript";
import Team from "./team.model";
import Project from "./project.model";

@Table({
    tableName: "teamProject",
  })
  class TeamProject extends Model {
    @ForeignKey(() => Project)
    @Column({ type: DataType.INTEGER, allowNull: false })
    projectId!: number;
  
    @ForeignKey(() => Team)
    @Column({ type: DataType.INTEGER, allowNull: false })
    teamId!: number;

    @BelongsTo(() => Project)
    project!: Project;
    @BelongsTo(() => Team)
    team!: Team;
  }
  
  export default TeamProject;