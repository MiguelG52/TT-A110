import { z } from "zod"
import { methods } from "../endpoints"
import { postAsyncAuth } from "../generalWebService"
import { createTeamSchema } from "@/models/schemas"

export const createTeam = async (values:z.infer<typeof createTeamSchema>) => {
    let response = await postAsyncAuth(methods.team.createTeam,values)
    return response
}