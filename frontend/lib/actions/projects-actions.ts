import { createProjectSchema } from "@/models/schemas";
import { methods } from "../endpoints";
import { getAsyncAuth, postAsyncAuth } from "../generalWebService";
import { z } from "zod";

export const getProjectsByUserId = async (userId: number, page: number = 1, limit: number = 6) => {
    let response = await getAsyncAuth(
        `${methods.user.getProjectsByUserId}?userId=${userId}&page=${page}&limit=${limit}`
    );
    return response;
};

export const createProject = async(values:z.infer<typeof createProjectSchema>)=>{
    let response = await postAsyncAuth(methods.projects.create, values)
    return response
}