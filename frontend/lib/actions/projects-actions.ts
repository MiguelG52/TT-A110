import { createProjectSchema } from "@/models/schemas";
import { methods } from "../endpoints";
import { getAsyncAuth, postAsyncAuth, putAsyncAuth } from "../generalWebService";
import { z } from "zod";
import { saveChanges } from "@/models/types";

export const getProjectsByUserId = async (userId: number, page: number = 1, limit: number = 6) => {
    const response = await getAsyncAuth(
        `${methods.user.getProjectsByUserId}?userId=${userId}&page=${page}&limit=${limit}`
    );
    return response;
};

export const createProject = async(values:z.infer<typeof createProjectSchema>)=>{
    const response = await postAsyncAuth(methods.projects.create, values)
    return response
}

export const getProjectById = async(projectId:string)=>{
    const response = await getAsyncAuth(`${methods.projects.getById}/${projectId}`)
    return response
}


export const updateImprovedCode = async (projectId: string, data:saveChanges) => {
    return await putAsyncAuth(`${methods.projects.saveChanges}/${projectId}`,data)
}
