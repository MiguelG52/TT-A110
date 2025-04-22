import { number, z } from "zod";

export interface IUser {
    userId: number,
    email: string,
    name: string,
    lastName: string,
    username: string,
    roleId: number
}