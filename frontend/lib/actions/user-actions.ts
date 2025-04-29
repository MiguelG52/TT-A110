import { methods } from "../endpoints";
import { getAsyncAuth } from "../generalWebService";

export const getUserStadictics = async(userId:number) =>{
    let response = await getAsyncAuth(
        `${methods.user.getUserStadictics}?userId=${userId}`
    );
    return response;
}