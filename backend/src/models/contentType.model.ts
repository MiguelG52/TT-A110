import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany, AllowNull } from "sequelize-typescript";
import  Content  from "./content.model";

@Table({
  tableName: "ContentType",
})
 class ContentType extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER})
  typeId!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;
  
  @HasMany(() => Content)
  contents!: Content[];

  }

export default ContentType;