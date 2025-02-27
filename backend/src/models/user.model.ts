import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany, AllowNull, Unique } from "sequelize-typescript";
import  Role from "./roles.model";
import  Content  from "./content.model";
import  UserGroup  from "./userGroup.model";
import  UserTeam  from "./userTeam.model";
import  Project  from "./project.model";

@Table({
  tableName: "Users",
  timestamps: true,
})
class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;
  
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  roleId!: number;


  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING, 
    allowNull: true})
  token!: string;

  @BelongsTo(() => Role)
  role!: Role;

  @HasMany(() => Content)
  contents!: Content[];

  @HasMany(() => UserGroup)
  userGroups!: UserGroup[];

  @HasMany(() => UserTeam)
  userTeams!: UserTeam[];

  @HasMany(() => Project)
  projects!: Project[];
 

}
export default User;