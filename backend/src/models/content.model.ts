import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import  User  from "./user.model";
import  ContentType  from "./contentType.model";

@Table({
  tableName: "Content",
})
 class Content extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER, allowNull: false })
  contentId!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @ForeignKey(() => ContentType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  typeId!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  description!: string;


  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;


  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => ContentType)
  contentType!: ContentType;
  
}

export default Content;