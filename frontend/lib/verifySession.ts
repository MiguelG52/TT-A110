import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { methods } from "./endpoints";


export const verifySession = cache(async () => {
    const token = cookies().get('token')?.value;
    if (!token) {
        redirect('/auth/sign-in');
    }
    const req = await fetch(methods.auth.getUserData, {
        method: 'GET',  
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    const response = await req.json()

    return{
        user:response,
        isAuth:true
    }
})