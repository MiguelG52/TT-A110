import { z } from "zod"
import { methods } from "../endpoints"
import { getAsyncAuth, postAsyncAuth } from "../generalWebService"
import { createProjectSchema, createTeamSchema, joinToTeamSchema } from "@/models/schemas"

export const createTeam = async (values:z.infer<typeof createTeamSchema>) => {
    const response = await postAsyncAuth(methods.team.createTeam,values)
    return response
}

export const getTeamsByUserId = async (userId: number, page: number = 1, limit: number = 6) => {
    const response = await getAsyncAuth(
        `${methods.user.getTeamsByUserId}?userId=${userId}&page=${page}&limit=${limit}`
    );
    return response;
};

export const getAllTeamsByUserId = async (userId:number)=>{
    const response = await getAsyncAuth(
        `${methods.user.getAllTeams}?userId=${userId}`
    )
    return response
}

export const  joinToTeam = async (values:z.infer<typeof joinToTeamSchema>) => {
    const response = await postAsyncAuth(methods.team.join,values)
    return response
}