
import { Model, DataType, Table, Column, PrimaryKey, HasMany, AutoIncrement } from "sequelize-typescript";
import User from "./user.model";


@Table
class Role extends Model{
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER
    })
    roleId!: number;

    @Column({type: DataType.STRING})
    name!: string;

    @HasMany(() => User)
    users!: User[];

    }

export default Role;