import { z } from "zod"
import { methods } from "../endpoints"
import { getAsyncAuth, postAsyncAuth } from "../generalWebService"
import { createTeamSchema } from "@/models/schemas"

export const createTeam = async (values:z.infer<typeof createTeamSchema>) => {
    let response = await postAsyncAuth(methods.team.createTeam,values)
    return response
}

export const getTeamsByUserId = async (userId: number, page: number = 1, limit: number = 6) => {
    let response = await getAsyncAuth(
        `${methods.user.getTeamsByUserId}?userId=${userId}&page=${page}&limit=${limit}`
    );
    return response;
};