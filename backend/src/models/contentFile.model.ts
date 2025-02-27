import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import  Content  from "./content.model";

@Table({
  tableName: "ContentFile",
  timestamps: true,
})
 class ContentFile extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  contentFileId!: number;
    
  @ForeignKey(() => Content)
  @Column({ type: DataType.INTEGER, allowNull: false })
  contentId!: number;
    
  @Column({ type: DataType.STRING, allowNull: false })
  contentURI!: string;

  
  @BelongsTo(() => Content)
  content!: Content;

  }
export default ContentFile;